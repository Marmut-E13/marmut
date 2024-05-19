"use client"

// import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts";
import { AuthenticatedNavbar } from "./authenticatedNavber";
import { UnauthenticatedNavbar } from "./unauthenticatedNavbar";

export const Navbar: React.FC = () => {
    const { isAuthenticated } = useAuth();

    console.log(isAuthenticated)

    return (
        <div>
            {isAuthenticated ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />}
        </div>
    );
};