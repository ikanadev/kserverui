import { Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { createAsync, query } from "@solidjs/router";
import { getServerStatus } from "~/utils/server";
import styles from "./index.module.css";
import { ServerStatus } from "~/utils/types";

const serverStatus = query(async function(): Promise<ServerStatus> {
	"use server";
	const data = await getServerStatus();
	return data;
}, "serverStatus");

export const route = {
	preload: () => serverStatus(),
};

export default function Home() {
	const status = createAsync(() => serverStatus());
	return (
		<main class={styles.container}>
			<Title>Server Status</Title>
			<h1>Server Status</h1>
			<Show when={status?.()}>{(data) => (
				<div>
					<pre>{JSON.stringify(data(), null, 2)}</pre>
					{/*
					<p>Battery: {data().battery}%</p>
					<p>RAM: {Math.round(data().ram.used / data().ram.total * 100)}%  -  {(data().ram.used/1024).toFixed(2)}/{(data().ram.total/1024).toFixed(2)}MB</p>
					<p>CPU: {data().cpu.toFixed(2)}%</p>
					*/}
				</div>
			)}
			</Show>
		</main>
	);
}
