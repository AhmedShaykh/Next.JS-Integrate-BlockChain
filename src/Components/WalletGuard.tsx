"use client";
import { useAccount } from "wagmi";

const WalletGuard = ({ children }: { children: React.ReactNode }) => {

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
            {children}
        </>
    )

};

export default WalletGuard;