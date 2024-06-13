"use client";
import NFTMinter from "@/Components/NFTMinter";
import DApp from "@/Components/DApp";
import { useAccount } from "wagmi";

const Main = () => {

    const { isDisconnected } = useAccount();

    if (isDisconnected) {
        return (
            <div className="grid place-items-center h-screen">
                <w3m-button />
            </div>
        )
    }

    return (
        <>
            <DApp />
            <NFTMinter />
        </>
    )
};

export default Main;