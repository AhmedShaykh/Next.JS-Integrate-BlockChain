"use client";
import { useAccount } from "wagmi";

const WalletGuard = ({ children }: { children: React.ReactNode }) => {

    const { isDisconnected } = useAccount();

    return (
        isDisconnected ? (
            <div className="flex justify-center items-center h-screen">
                <w3m-button />
            </div>
        ) : (
            <>
                {children}
            </>
        )
    )

};

export default WalletGuard;