"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dashboard } from "@/components";

export default function Home(){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const router = useRouter();

    useEffect(() => {
      if (!localStorage.getItem('email')){
        router.push('/auth')
      } else {
        setIsAuthenticated(true)
      }
    }, [])


    return (
      isAuthenticated && (
        <Dashboard />
      )
    )
}