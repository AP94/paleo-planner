import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(checkbox|form).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'signpost-top': '#FFF5c3',
        'signpost-bottom': '#fdc888',
        'signpost-back': '#efa050',
        
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [nextui()],
} satisfies Config;
