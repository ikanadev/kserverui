import { css } from "@panda/css";

export const container = css({
  maxW: "3xl",
  mx: "auto",
  p: "3",
});

export const grid = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "4",
  py: "4",
});

export const item = css({
  display: "flex",
  alignItems: "center",
  gap: "4",
});
export const itemIcon = css({
  fill: "gray.200",
});
export const itemData = css({
  fontSize: "3xl",
  color: "primary",
  fontWeight: "bold",
});
export const itemLabel = css({
  fontSize: "xs",
});
