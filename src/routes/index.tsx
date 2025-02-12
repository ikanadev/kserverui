import { Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { createAsync, query, action } from "@solidjs/router";

import { getServerStatus } from "~/utils/server";
import styles from "./index.module.css";
import { ServerStatus } from "~/utils/types";

const sendMessage = action(async (msg: string) => {
  "use server";
  console.log("Sending message:", msg);
});


const serverStatus = query(async function(): Promise<any> {
  "use server";
  try {
    const data = await getServerStatus();
    const resp = await Bun.fetch('http://host.docker.internal:3080');
    const respText = await resp.text();
    console.log(respText);
    return { data, respText };
  } catch (error) {
    console.error(error);
    return { error };
  }
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
      <div>
        <button onClick={() => { sendMessage("test"); }}>Send Message</button>
      </div>
      <Show when={status?.()}>{(data) => (
        <div>
          <img src="/gopher.svg" alt="kserverui logo" />
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
