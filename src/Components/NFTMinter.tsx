"use client";
import { useState } from "react";
import { pinataToken } from "@/lib/services";
import { Button } from "@/Components/ui/button";
import axios from "axios";

const NFTMinter = () => {

    const [file, setFile] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        setLoading(true);

        const form = new FormData();

        form.append("file", file);

        try {

            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
                headers: {
                    Authorization: `Bearer ${pinataToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });

        } catch (error) {

            console.log(error);

        }

        setLoading(false);

    };

    const handleFileUpload = (e: any) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="flex justify-center items-center mt-5 mb-8 max-w-5xl mx-auto">
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
        </div>
    )
};

export default NFTMinter;