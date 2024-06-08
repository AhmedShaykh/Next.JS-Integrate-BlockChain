import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { sepolia } from "wagmi/chains";

export const projectId = "67b6d9e69fdd2fc0e1a263b4d342aed2";

if (!projectId) throw new Error("Project ID Is Not Defined");

const metadata = {
    name: "Next.JS Integrate BlockChain",
    description: "Next.JS Integrate BlockChain (Smart Contract)",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

const chains = [sepolia] as const;

export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    })
});