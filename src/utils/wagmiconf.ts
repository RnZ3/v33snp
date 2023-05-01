import type { Chain } from "wagmi";
import { configureChains, createClient } from "wagmi";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";
import {
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { rabbyWallet } from "@rainbow-me/rainbowkit/wallets";

import {
  mainnet,
  fantom,
  fantomTestnet,
  arbitrum,
  optimism,
  bsc,
  avalanche,
} from "wagmi/chains";

export const { chains, provider, webSocketProvider } = configureChains(
  [avalanche, bsc, arbitrum, optimism, fantom, fantomTestnet],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({ appName: "v3snp", chains });

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Popular",
    wallets: [rabbyWallet({ chains })],
  },
]);

export const client = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});
