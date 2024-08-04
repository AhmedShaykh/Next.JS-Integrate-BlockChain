import { useEffect, useState } from "react";
import { NFTContractABI, NFTContractAddress } from "@/abi";
import { apiJWT } from "@/lib/services";
import { useAccount, useReadContract } from "wagmi";
import Link from "next/link";
import axios from "axios";

const NFTs = () => {

    const [data, setData] = useState<any>(null);

    const [error, setError] = useState<any>(null);

    const { address } = useAccount();

    const { data: nfts, isPending: isNftsLoading }: any = useReadContract({
        address: NFTContractAddress,
        abi: NFTContractABI,
        functionName: "getUserTokenURIs",
        args: [address]
    });

    useEffect(() => {

        const options = {
            method: "get",
            baseURL: "https://api.opensea.io/api/v2",
            url: `/sepolia/contract/address/nfts/identifier`,
            headers: {
                Authorization: `Bearer ${apiJWT}`,
                "Content-Type": "application/json"
            }
        };

        axios(options)
            .then(response => setData(response.data))
            .catch(error => setError(error));

    }, []);

    return (
        <div className="my-5">
            {!isNftsLoading ? (
                <>
                    {nfts?.map((item: any, i: number) => (
                        <Link
                            className="block text-blue-500 py-3"
                            href={`${item}`}
                            key={i}
                        >
                            {item}
                        </Link>
                    ))}
                </>
            ) : (
                <h2 className="text-lg text-center py-4 font-semibold">
                    NFTs Is Loading...
                </h2>
            )}
        </div>
    )
};

export default NFTs;