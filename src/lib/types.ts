export type ServerStatus = {
	battery: {
		hasBattery: boolean;
		percentage: number | null;
		status: string | null;
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
};
