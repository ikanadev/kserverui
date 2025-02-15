import { Show, Suspense } from "solid-js";
import { Title } from "@solidjs/meta";
import {
  createAsync,
  query,
  action,
  type RouteDefinition,
} from "@solidjs/router";

import type { ServerStatus } from "@app/utils/types";
import * as classes from "@routes/index/styles";
import { N } from "@routes/index/constants";

const sendMessage = action(async (msg: string) => {
  "use server";
  console.log("Sending message:", msg);
});

const serverStatus = query(async () => {
  "use server";
  // const resp = await Bun.fetch('http://host.docker.internal:8000');
  const resp = await Bun.fetch("http://localhost:8000");
  const data = (await resp.json()) as ServerStatus;
  return data;
}, "serverStatus");

export const route = {
  preload: () => serverStatus(),
} satisfies RouteDefinition;

export default function Home() {
  const status = createAsync(() => serverStatus());
  return (
    <main class={classes.container}>
      <Title>Server Status</Title>
      <h1>Server Status {N}</h1>
      <p>
        In short, Svelte is a way of writing user interface components — like a
        navigation bar, comment section, or contact form — that users see and
        interact with in their browsers. The Svelte compiler converts your
        components to JavaScript that can be run to render the HTML for the page
        and to CSS that styles the page. You don’t need to know Svelte to
        understand the rest of this guide, but it will help. If you’d like to
        learn more, check out the Svelte tutorial.
      </p>
      <div>
        <button
          type="button"
          onClick={() => {
            sendMessage("test");
          }}
        >
          Send Message
        </button>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Show when={status?.()}>
          {(data) => (
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
