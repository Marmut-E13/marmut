"use client"

import { usePathname, useRouter } from "next/navigation";
import MarmutPNG from '@/images/marmut.png'
import Image from "next/image";
// import UserDashboard from "@/components/dashboard/userDashboard";

const Auth: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname()

    const AUTH_OPTIONS = [
        { text: "Register", route: `${pathname}/register` },
        { text: "Login", route: `${pathname}/login` },
    ];

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">

            <div className="flex flex-col gap-3 items-center">
                <text className="text-4xl font-bold font-domine">Marmut-E13</text>

                <Image
                    src={MarmutPNG}
                    alt="Marmut"
                />
            </div>

            <div className="flex flex-col gap-2 mt-2">
                {AUTH_OPTIONS.map(({text, route}, key) => (
                    <button key={key} className="py-2 text-marmut-000 rounded-lg bg-marmut-dark-green-300 w-[160px] text-lg hover:bg-marmut-green-200 hover:text-marmut-900" onClick={() => router.push(route)}>
                        {text}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Auth;