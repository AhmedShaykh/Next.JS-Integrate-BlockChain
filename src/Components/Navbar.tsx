import ModeToggle from "./ModeToggle";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex justify-center items-center py-5 gap-20 border-b-2">
            <Link href="/">
                <h2 className="text-lg font-semibold">
                    Home
                </h2>
            </Link>

            <ModeToggle />
        </div>
    )
};

export default Navbar;