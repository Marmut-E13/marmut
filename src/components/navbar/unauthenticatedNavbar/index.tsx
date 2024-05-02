"use client"

import { usePathname, useRouter } from "next/navigation";

export const UnauthenticatedNavbar = () => {
    const router = useRouter();
    const pathname = usePathname()

    const UNATHENTICATED_NAVBAR_MENU = [
        { text: "Register", route: "/register" },
        { text: "Login", route: "/login" },
    ];

    return (
        <div className="flex flex-row w-screen bg-marmut-dark-green-300 z-[999] fixed px-5 py-3 justify-between items-center">
            <text className="select-none text-marmut-100 font-bold text-[18px]">Marmut-E13</text>

            <div className="flex flex-row gap-3 text-marmut-000">
                <button className="">Login</button>
                <button className="bg-marmut-brown-700 px-3 py-[6px] rounded-lg">Register</button>
            </div>
        </div>
    )
}