import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/styles/theme";

import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig } from "wagmi";
import { client, chains } from "@/utils/wagmiconf";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={darkTheme()}
      >
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
