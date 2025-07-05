import { createEffect, createResource, Show, Suspense } from "solid-js";

import * as classes from "@routes/index/styles";
import { fetchServerStatus } from "@app/routesData/index/utils.server";
import CpuIcon from "@app/assets/svg/cpu.svg?solid";
import MemoryIcon from "@app/assets/svg/memory.svg?solid";
import StorageIcon from "@app/assets/svg/storage.svg?solid";
import BatteryIcon from "@app/assets/svg/battery.svg?solid";
import { formatUsage } from "@app/routesData/index/utils";

export default function Home() {
  const [serverStatus, { refetch }] = createResource(fetchServerStatus);

  const refetchInterval = setInterval(() => {
    refetch();
  }, 5000);

  createEffect(() => {
    return () => {
      clearInterval(refetchInterval);
    };
  });

  return (
    <main class={classes.container}>
      <h1>My home server :)</h1>
      <p>
        Welcome to my home server, you can't do many things here unless you're me :)
      </p>
      <Suspense>
        <Show when={serverStatus?.latest}>
          {(data) => (
            <>
              <div class={classes.grid}>
                <div class={classes.item}>
                  <CpuIcon class={classes.itemIcon} />
                  <div>
                    <p class={classes.itemData}>{data().cpu.usage}%</p>
                    <p class={classes.itemLabel}>{data().cpu.name}</p>
                  </div>
                </div>

                <div class={classes.item}>
                  <MemoryIcon class={classes.itemIcon} />
                  <div>
                    <p class={classes.itemData}>{formatUsage(data().ram.used)}</p>
                    <p class={classes.itemLabel}>of {formatUsage(data().ram.total)}</p>
                  </div>
                </div>

                <div class={classes.item}>
                  <StorageIcon class={classes.itemIcon} />
                  <div>
                    <p class={classes.itemData}>{formatUsage(data().storage.used)}</p>
                    <p class={classes.itemLabel}>of {formatUsage(data().storage.total)}</p>
                  </div>
                </div>

                <Show when={data().battery.hasBattery}>
                  <div class={classes.item}>
                    <BatteryIcon class={classes.itemIcon} />
                    <div>
                      <p class={classes.itemData}>{data().battery.percentage}%</p>
                      <p class={classes.itemLabel}>{data().battery.status}</p>
                    </div>
                  </div>
                </Show>
              </div>
            </>
          )}
        </Show>
      </Suspense>
      <br />
      <br />
      <h1>My apps</h1>
    </main>
  );
}
