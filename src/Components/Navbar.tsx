import ModeToggle from "./ModeToggle";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex justify-center items-center py-5 gap-24 border-b-2">
            <Link href="/">
                <h2 className="text-lg font-semibold">
                    Home
                </h2>
            </Link>

            <div className="flex justify-center items-center gap-4">
                <ModeToggle />

                <div className="bg-black text-white rounded-full">
                    <w3m-button />
                </div>
            </div>
        </div>
    )
};

export default Navbar;