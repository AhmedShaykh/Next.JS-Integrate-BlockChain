import { ContractABI, ContractAddress } from "@/abi";
import { Button } from "@/Components/ui/button";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { formatEther, parseEther } from "viem";

const DApp = () => {

    const { data: ownerName }: any = useReadContract({
        abi: ContractABI,
        address: ContractAddress,
        functionName: "getOwnerName"
    });

    const { data: ownerAddress }: any = useReadContract({
        abi: ContractABI,
        address: ContractAddress,
        functionName: "getOwnerAddress"
    });

    const { data: contractBalance }: any = useReadContract({
        abi: ContractABI,
        address: ContractAddress,
        functionName: "getContractBalance"
    });

    const { writeContract, isPending: updatingOwnerName } = useWriteContract();

    const { data: hash, writeContract: payContract, isPending: isPayContract } = useWriteContract();

    const { data: withdrawHash, writeContract: withdraw, isPending: isWithdraw } = useWriteContract();

    const { isLoading: isPayConfirm } = useWaitForTransactionReceipt({
        confirmations: 2,
        hash
    });

    const { isLoading: isWithdrawConfirm } = useWaitForTransactionReceipt({
        confirmations: 1,
        hash: withdrawHash
    });

    const setOwnerNew = () => {
        return writeContract({
            abi: ContractABI,
            address: ContractAddress,
            functionName: "setOwnerName",
            args: ["Ahmed Saleem Shaikh"]
        })
    };

    const pay = () => {
        return payContract({
            abi: ContractABI,
            address: ContractAddress,
            functionName: "payContract",
            value: parseEther("0.0001")
        })
    };

    const withdrawEther = () => {
        return withdraw({
            abi: ContractABI,
            address: ContractAddress,
            functionName: "withdraw"
        })
    };

    const balance: string = formatEther(contractBalance?.toString());

    return (
        <div className="my-8 flex flex-col justify-center items-center gap-2">
            <h2 className="text-lg py-4 font-semibold">
                Owner Name: {ownerName}
            </h2>

            <h2 className="text-md py-2 font-semibold">
                Owner Name: {ownerAddress}
            </h2>

            <h2 className="text-md py-2 font-semibold mb-2">
                Get Contract Balance: {""}

                <span className="font-bold">
                    {balance} ETH
                </span>
            </h2>

            <Button
                className="py-2 px-5 rounded-full text-md font-semibold my-2"
                onClick={setOwnerNew}
            >
                {updatingOwnerName ? "Loading..." : "Update Name"}
            </Button>

            <Button
                className="py-2 px-5 rounded-full text-md font-semibold my-2"
                onClick={pay}
            >
                {isPayContract || isPayConfirm ? "Loading..." : "Pay Contract"}
            </Button>

            <Button
                className="py-2 px-5 rounded-full text-md font-semibold my-2"
                onClick={withdrawEther}
            >
                {isWithdraw || isWithdrawConfirm ? "Loading..." : `Withdraw ${balance} ETH`}
            </Button>
        </div>
    )
};

export default DApp;