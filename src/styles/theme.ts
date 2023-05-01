import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig, ChakraTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

export const siteTheme: Partial<ChakraTheme> = {
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode("#222", "#EEE")(props),
        background: mode("#F4F7FF", "#28213c")(props),
        fontSize: "1rem",
      },
    }),
  },
  fonts: {
    heading: "monospace",
    body: "monospace",
  },
  semanticTokens: {
    colors: {
      bw_green: { default: "#308e61", _dark: "#4be39c" },
    },
  },
  components: {
    Progress: {
      defaultProps: {
        colorScheme: "green",
      },
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({ ...siteTheme, config });
export default theme;
