export type BatteryStatus = "Charging" | "Discharging" | "Full" | "Not charging" | "Unknown";

export type ServerStatus = {
	battery: {
		percentage: number | null;
		status: BatteryStatus | null;
	};
	ram: {
		total: number | null;
		used: number | null;
	};
	cpu: {
		usage: number | null;
		name: string | null;
	};
	storage: {
		total: number | null;
		used: number | null;
	};
}
