"use client"

import { usePathname, useRouter } from "next/navigation";
import MarmutPNG from '@/images/marmut2.png'
import Image from "next/image";

const Auth: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname()

    const AUTH_OPTIONS = [
        { text: "Register", route: "/register" },
        { text: "Login", route: "/login" },
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

        <div className="flex flex-col gap-2">
          {AUTH_OPTIONS.map(({text, route}, key) => (
            <button key={key} type="button" className="btn btn-primary w-[160px] text-lg" onClick={() => router.push(route)}>
              {text}
            </button>
          ))}
        </div>
      </div>
    )
}

export default Auth;