import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
// import { Theme } from "@chakra-ui/theme";

export const theme = extendTheme({
  breakpoints: createBreakpoints({
    sm: "37.5em", // 600px
    md: "60em", // 960px
    lg: "90em", // 1440px
    xl: "120em", // 1920px
  }),
  space: {
    xxsm: "4px",
    xsm: "8px",
    sm: "16px",
    md: "24px",
    lg: "32px",
    xlg: "40px",
    xxl: "64px",
  },
  fontSizes: {
    xsm: "12px",
    sm: "14px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "42px",
  },
  colors: {
    text: "#000",
    gray_0: '#FBFBFB',
    gray_1: '#f5f3f4',
    gray_2: '#edede8',
    gray_3: '#a9abae'
  },
})