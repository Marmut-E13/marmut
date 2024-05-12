"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts";

export default function Home(){
    const router = useRouter();
    const isAuth = typeof window !== 'undefined' && !!!localStorage.getItem('email');

    useEffect(() => {
      setTimeout(() => {
          if (isAuth) {
              router.push('/auth');
          }
      }, 500);
  }, []);

    return (
      isAuth && (
        <div>
          
        </div>
      )
    )
}