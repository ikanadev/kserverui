import type { ServerStatus } from "@app/utils/types";

export async function fetchServerStatus() {
  "use server";
  const resp = await Bun.fetch(`${process.env.HOME_PATH}/stats`);
  const data = (await resp.json()) as ServerStatus;
  return data;
}
