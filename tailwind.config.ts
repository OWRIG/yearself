import { nextui } from "@nextui-org/theme";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/components/(button|input|progress|select|ripple|spinner|form|listbox|divider|popover|scroll-shadow).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["LXGWWenKai", ...fontFamily.sans],
        serif: ["LXGWWenKai", ...fontFamily.serif],
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
