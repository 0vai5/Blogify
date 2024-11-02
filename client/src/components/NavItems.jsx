import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NavItems = () => {
    const { isLoggedIn } = useContext(GlobalContext);
    return (
        <>
            <ul className="flex flex-col md:flex-row gap-10 justify-between items-start md:items-center mt-10 md:mt-0">
                <li>
                    <a href="/">
                        <h4 className="text-xl font-semibold">Home</h4>
                    </a>
                </li>
                {isLoggedIn && (
                    <li>
                        <a href="/create-blog">
                            <h4 className="text-xl font-semibold">Create Blog</h4>
                        </a>
                    </li>
                )}
                <li>
                    <a href="/blogs">
                        <h4 className="text-xl font-semibold">Blogs</h4>
                    </a>
                </li>
            </ul>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
};

export default NavItems;