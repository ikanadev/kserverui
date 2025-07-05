import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  'html, body': {
    lineHeight: '1.65',
    background: 'gray.900',
    color: 'gray.200',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontWeight: '600',
    fontSize: 'medium',
    color: 'gray.100',
  },
});

export default defineConfig({
  // Whether to use CSS reset
  preflight: true,

  // Where to look for your CSS declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          primary: {
            value: { base: "{colors.emerald.500}", _dark: "{colors.emerald.400}" },
          },
        },
      },
    },
  },

  // The output directory for your CSS system
  outdir: "styled-system",
  strictTokens: true,
  strictPropertyValues: true,
  globalCss,
  // hash: true,
});
