import { Button, Box, HStack, VStack, Text, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useSwitchNetwork } from "wagmi";
import { useNetwork } from "wagmi";

const dexConfig = [
  { proto: "thena", name: "Thena", network: 56 },
  { proto: "equalizer", name: "Equalizer", network: 250 },
  { proto: "solidsnek", name: "SolidSnek", network: 43114 },
  { proto: "chronos", name: "Chronos", network: 42161 },
];

export default function Page1() {
  const [myDex, setDex] = useState(0);
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { chain } = useNetwork();
  const account = useAccount();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setDex(Number(e.target.value));
  };

  useEffect(() => {
    const mydexNet = Number(dexConfig[myDex].network);
    console.log("effect", chain?.id, mydexNet);
    if (chain?.id !== mydexNet) {
      switchNetwork?.(mydexNet);
    }
  }, [myDex, chain]);

  return (
    <>
      <Box m={3}>
        <VStack>
          <HStack spacing="7rem">
            <Box alignItems="center">
              <Box>
                <Select
                  defaultValue={myDex}
                  id="network"
                  name="dex"
                  onChange={handleChange}
                >
                  {dexConfig.map((c, i) => {
                    return (
                      <option key={i} value={i}>
                        {c.name}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            </Box>
            <Box>
              <Box>
                <Select placeholder="select veNFT"></Select>
              </Box>
            </Box>
            <Box>
              <Box>
                <ConnectButton accountStatus="address" chainStatus="none" />
              </Box>
            </Box>
          </HStack>
        </VStack>
      </Box>
      <Box m={3} bg="black" p={3}>
        <VStack>
          <HStack spacing="7rem">
            <HStack>
              <Box>
                <Text>Update Rate:</Text>
              </Box>
              <Box>
                <Select>
                  <option value="3">3s</option>
                  <option value="12">12s</option>
                  <option value="30">30s</option>
                  <option value="60">1m</option>
                </Select>
              </Box>
            </HStack>
            <Box>
              <Text>Epoch End: 23min 42sec</Text>
            </Box>
            <Box>
              <Text>Gas Estimate: 27 units ($0.86)</Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
      <Box m={3} bg="black" p={3}>
        <Text>Dex: {dexConfig[myDex].name}</Text>
        <Text>Network: {chain && chain.name}</Text>
        <Text>Address: {account && account.address}</Text>
      </Box>
      <Box m={3} bg="black" p={3}>
        <Text>sniper list here ... </Text>
      </Box>
    </>
  );
}
