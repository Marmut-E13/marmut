"use client"

import React, { useEffect, useState } from "react"
import { AuthenticatedNavbar } from "./authenticatedNavber";
import { UnauthenticatedNavbar } from "./unauthenticatedNavbar";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem("email")) {
            setIsAuthenticated(true);
        }
    }, [pathname])

    return (
        <div>
            {/* {isAuthenticated ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />} */}
            {/* <AuthenticatedNavbar /> */}
            <UnauthenticatedNavbar />
        </div>
    )
}