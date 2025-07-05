import { A } from "@solidjs/router";

export default function About() {
  return (
    <main>
      <h1>About</h1>
      <A href="/">Home</A>
      <img src="/gopher.svg" alt="kserverui logo" />
    </main>
  );
}
