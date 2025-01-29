import { Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { createAsync, query } from "@solidjs/router";
import styles from "./index.module.css";

type ServerData = {
	battery: number;
	ram: {
		total: number;
		used: number;
	};
	cpu: number;
}
const getServerData = query(async function(): Promise<ServerData | null> {
	"use server";
	try {
		const batteryStr = await Bun.$`cat /sys/class/power_supply/BAT0/capacity`.text();
		// const batteryStr = await Bun.$`cat /sys/class/net/enp6s0/statistics/rx_packets`.text();
		const battery = parseInt(batteryStr.trim());

		const ramStr = await Bun.$`free -m | awk '/Mem:/ {printf "%s %s", $2, $3}'`.text();
		const ramSections = ramStr.trim().split(" ");

		const cpuStr = await Bun.$`grep 'cpu ' /proc/stat | awk '{idle=$5; total=$2+$3+$4+$5; print (1-idle/total)*100}'`.text();
		const cpu = parseFloat(cpuStr.trim());
		return {
			battery,
			ram: {
				total: parseInt(ramSections[0]),
				used: parseInt(ramSections[1]),
			},
			cpu,
		};
	} catch (e) {
		console.log("Error:", e);
		return null;
	}
}, "serverData");

export const route = {
	preload: () => getServerData(),
};

export default function Home() {
	const serverData = createAsync(() => getServerData());
	return (
		<main class={styles.container}>
			<Title>Server Status</Title>
			<h1>Server Status</h1>
			<Show when={serverData?.()}>{(data) => (
				<div>
					<p>Battery: {data().battery}%</p>
					<p>RAM: {Math.round(data().ram.used / data().ram.total * 100)}%  -  {(data().ram.used/1024).toFixed(2)}/{(data().ram.total/1024).toFixed(2)}MB</p>
					<p>CPU: {data().cpu.toFixed(2)}%</p>
				</div>
			)}
			</Show>
		</main>
	);
}
