import { useState } from "react";
import { NFTContractABI, NFTContractAddress } from "@/abi";
import { apiJWT } from "@/lib/services";
import { Button } from "@/Components/ui/button";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Link from "next/link";
import axios from "axios";

const NFTMinter = () => {

    const [file, setFile] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    const { writeContract } = useWriteContract();

    const { address } = useAccount();

    const { data: nfts, isPending: isNftsLoading }: any = useReadContract({
        address: NFTContractAddress,
        abi: NFTContractABI,
        functionName: "getUserTokenURIs",
        args: [address]
    });

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        setLoading(true);

        const form = new FormData();

        form.append("file", file);

        try {

            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
                headers: {
                    Authorization: `Bearer ${apiJWT}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            const imageHash = res.data.IpfsHash;

            const body = {
                pinataOptions: { cidVersion: 1 },
                pinataMetadata: { name: `${Math.floor(Math.random() * 1000)}.json` },
                pinataContent: {
                    description: "My NFTs",
                    external_url: "",
                    imageUrl: `ipfs://${imageHash}`,
                    image: `ipfs://${imageHash}`,
                    name: "Ahmed Shaykh",
                    attributes: []
                }
            };

            const jsonRes = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", body, {
                headers: {
                    Authorization: `Bearer ${apiJWT}`,
                    "Content-Type": "application/json",
                },
            });

            await writeContract({
                address: NFTContractAddress,
                abi: NFTContractABI,
                functionName: "safeMint",
                args: [address, `ipfs://${jsonRes.data.IpfsHash}`]
            });

            console.log(jsonRes);

        } catch (error) {

            console.log(error);

        }

        setLoading(false);

    };

    const handleFileUpload = (e: any) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="flex flex-col justify-center items-center mt-5 mb-8 max-w-5xl mx-auto">
            {loading ? (
                <h2 className="text-lg text-center py-4 font-semibold">
                    Uploading Image On IPFS Pinata...
                </h2>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={handleFileUpload}
                            type="file"
                        />

                        <Button
                            className="py-2 px-5 rounded-full text-md font-semibold my-2"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </form>
                </>
            )}

            <div className="my-5">
                {!isNftsLoading ? (
                    nfts.map((item: any, i: number) => (
                        <Link
                            className="block text-blue-500 py-3"
                            href={`https://ipfs.io/${item}`}
                            key={i}
                        >
                            {item}
                        </Link>
                    ))
                ) : (
                    <h2 className="text-lg text-center py-4 font-semibold">
                        NFTs Is Loading...
                    </h2>
                )}
            </div>
        </div>
    )
};

export default NFTMinter;