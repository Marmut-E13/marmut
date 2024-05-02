"use client"

import { usePathname, useRouter } from "next/navigation";
import Marmut2PNG from '@/images/marmut2.png'
import Image from "next/image";
import { FormEvent } from "react";
import { login } from "@/actions/login";

const Login: React.FC = () => {

    const router = useRouter();
    const pathname = usePathname();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);

      try{
        const isAuthenticated = await login(formData);

        // console.log(isAuthenticated)
        if (isAuthenticated){
          localStorage.setItem('email', formData.get('email') as string)
          router.push('/')
        }
      } catch {

      }
    }

    // localStorage.removeItem('email')

    const REGISTER_OPTIONS = [
        { text: "Label", route: `${pathname}/label` },
        { text: "Pengguna", route: `${pathname}/pengguna` },
    ];

    return (
      <div className="px-[120px] flex justify-center py-[90px]">
            <form onSubmit={handleLogin} className="min-w-[600px] border-[2px] border-marmut-green-700 rounded-xl p-[55px] flex flex-col gap-4">

                <div>
                    <label className="form-label">Email</label>
                    <input name="email" type="email" className="form-control border-marmut-green-600" />
                </div>

                <div>
                    <label className="form-label">Password</label>
                    <input name="password" type="password" className="form-control border-marmut-green-600" />
                </div>

                <button className="">Submit</button>
            </form>
        </div>
    )
}

export default Login;
