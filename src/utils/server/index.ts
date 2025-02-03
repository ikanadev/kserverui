import { BatteryStatus, ServerStatus } from "~/utils/types";

export async function getServerStatus(): Promise<ServerStatus> {
	const batteryPercentagePromise = Bun.$`cat /sys/class/power_supply/BAT0/capacity`
		.text()
		.then((str) => parseInt(str.trim()))
		.catch(() => null);

	const batteryStatusPromise = Bun.$`cat /sys/class/power_supply/BAT0/status`
		.text()
		.catch(() => null);

	// Gets total and used RAM in MB
	const ramDataPromise = Bun.$`free -m | awk '/Mem:/ {printf "%s %s", $2, $3}'`
		.text()
		.catch(() => null);

	const cpuUsagePromise = Bun.$`grep 'cpu ' /proc/stat | awk '{idle=$5; total=$2+$3+$4+$5; print (1-idle/total)*100}'`
		.text()
		.then((str) => parseFloat(str.trim()))
		.catch(() => null);

	const cpuNamePromise = Bun.$`grep "model name" /proc/cpuinfo | uniq | sed 's/.*: //'`
		.text()
		.then((str) => str.trim())
		.catch(() => null);

	// Gets the storage in MB
	const storageTotalPromise = Bun.$`lsblk -dno SIZE,TYPE,MOUNTPOINT --bytes | awk '$2 == "disk" && $3 != "[SWAP]" {print int($1/1024/1024)}'`
		.text()
		.then((str) => parseInt(str.trim()))
		.catch(() => null);

	const storageUsedPromise = Bun.$`df --block-size=1M --output=target,used | awk '$1 == "/" {print $2}'`
		.text()
		.then((str) => parseInt(str.trim()))
		.catch(() => null);

	const [batteryPercentage, batteryStatus, ramData, cpuUsage, cpuName, storageTotal, storageUsed] = await Promise.all([
		batteryPercentagePromise,
		batteryStatusPromise,
		ramDataPromise,
		cpuUsagePromise,
		cpuNamePromise,
		storageTotalPromise,
		storageUsedPromise,
	]);
	let totalRam: null | number = null;
	let usedRam: null | number = null;
	if (ramData) {
		const ramSections = ramData.trim().split(" ");
		totalRam = parseInt(ramSections[0]);
		usedRam = parseInt(ramSections[1]);
	}

	return {
		battery: {
			percentage: batteryPercentage,
			status: batteryStatus as BatteryStatus | null,
		},
		ram: {
			total: totalRam,
			used: usedRam,
		},
		cpu: {
			usage: cpuUsage,
			name: cpuName,
		},
		storage: {
			total: storageTotal,
			used: storageUsed,
		},
	};
}
