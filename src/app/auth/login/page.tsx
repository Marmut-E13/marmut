"use client"

import { usePathname, useRouter } from "next/navigation";
import Marmut2PNG from '@/images/marmut2.png'
import Image from "next/image";
import { FormEvent } from "react";
import { loginUser } from "@/actions/loginUser";
import { useAuth } from "@/contexts";

const Login: React.FC = () => {
    const { login } = useAuth();

    const router = useRouter();
    const pathname = usePathname();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);

      try{
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const userRole = await login(email, password);

        console.log("ini suer role client:", userRole);

        // if (userRole !== undefined && userRole[0] !== ''){
          // console.log("final boss debug")
          // localStorage.setItem('email', formData.get('email') as string)
          // router.push('/')
        // }

      } catch {

      }
    }

    const REGISTER_OPTIONS = [
        { text: "Label", route: `${pathname}/label` },
        { text: "Pengguna", route: `${pathname}/pengguna` },
    ];

    return (
      <div className="px-[120px] flex justify-center py-[90px]">
            <form onSubmit={handleLogin} className="min-w-[600px] border-[2px] border-stonks-700 rounded-xl p-[55px] flex flex-col gap-4">

                <div>
                    <label className="form-label">Email</label>
                    <input name="email" type="email" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Password</label>
                    <input name="password" type="password" className="form-control border-stonks-600" />
                </div>

                <button className="">Submit</button>
            </form>
        </div>
    )
}

export default Login;
