import { Show, Suspense } from "solid-js";
import { Title } from "@solidjs/meta";
import { createAsync, query, action, RouteDefinition } from "@solidjs/router";

import styles from "./index.module.css";
import { ServerStatus } from "~/utils/types";

const sendMessage = action(async (msg: string) => {
  "use server";
  console.log("Sending message:", msg);
});


const serverStatus = query(async function() {
  "use server";
  // const resp = await Bun.fetch('http://host.docker.internal:8000');
  const resp = await Bun.fetch('http://localhost:8000');
  const serverStatus = (await resp.json()) as ServerStatus;
  return serverStatus;
}, "serverStatus");

export const route = {
  preload: () => serverStatus(),
} satisfies RouteDefinition;

export default function Home() {
  const status = createAsync(() => serverStatus());
  return (
    <main class={styles.container}>
      <Title>Server Status</Title>
      <h1>Server Status</h1>
      <div>
        <button onClick={() => { sendMessage("test"); }}>Send Message</button>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
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
      </Suspense>
    </main>
  );
}
