"use client"

import { usePathname, useRouter } from "next/navigation";

export const UnauthenticatedNavbar = () => {
    const router = useRouter();
    const pathname = usePathname()

    const UNATHENTICATED_NAVBAR_MENU = [
        { text: "Register", route: "auth/register" },
        { text: "Login", route: "auth/login" },
    ];

    return (
        <div className="flex flex-row w-screen bg-marmut-green-900 z-[999] fixed px-5 py-3 justify-between items-center">
            <text className="select-none text-marmut-100 font-bold">Marmut-E13</text>

            <div className="flex flex-row gap-3">
                {UNATHENTICATED_NAVBAR_MENU.map(({text, route}, key) => (
                    <div className="flex flex-col select-none" key={key}>
                        <div className={`${pathname == route ? 'text-[#7698c8] font-semibold' : 'text-marmut-000'} text-[14px] flex px-1 py-1 cursor-pointer`} onClick={() => {router.push(route)}}>
                            {text}
                        </div>

                        {pathname == route && <div className="h-[2px] bg-[#7698c8] rounded-md"></div>}
                </div>
                ))}
            </div>


        </div>
    )
}