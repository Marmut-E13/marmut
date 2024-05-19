
"use client"

import { usePathname, useRouter } from "next/navigation";

export const UnauthenticatedNavbar = () => {
    const router = useRouter();
    const pathname = usePathname()

    return (
        <div className="flex flex-row w-screen bg-marmut-dark-green-300 z-[999] fixed px-5 py-3 justify-between items-center h-[62px]">
            <text className="select-none text-marmut-100 font-bold text-[18px]">Marmut-E13</text>

            <div className="flex flex-row gap-4 text-marmut-000 text-[18px]">
                <button className="hover:text-marmut-100" onClick={() => router.push('/auth/login')}>Login</button>
                <button className="bg-marmut-brown-500 px-3 py-[5px] rounded-lg hover:bg-marmut-light-brown-200 hover:text-marmut-brown-800" onClick={() => router.push('/auth/register')}>Register</button>
            </div>
        </div>
    )
}
