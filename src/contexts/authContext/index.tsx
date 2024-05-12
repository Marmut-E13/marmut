"use client"

import { loginUser } from "@/actions/loginUser";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    username: string;
    role: ('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[];
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    username: '',
    role: [''],
    isAuthenticated: false,
    login: (email: string, password: string) => Promise.resolve([]),
    logout: () => {}
});


export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({
    children
}) => {
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]>(['']);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedIsAuthenticated = !!storedEmail; 
        setIsAuthenticated(storedIsAuthenticated);
        setUsername(storedEmail || '');
        setRole(localStorage.getItem("role") ? localStorage.getItem("role")?.split(",") as any : [''])
    }, []);

    const login = async (email: string, password: string): Promise<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]> => {
        try {
            const userRoles = await loginUser(email, password);
    
            if (userRoles !== undefined && userRoles !== null && userRoles[0] !== '') {
                setIsAuthenticated(true);
                setUsername(email);
                setRole(userRoles as ("" | "pengguna" | "podcaster" | "songwriter" | "artist" | 'label' | 'premium')[]);

                // console.log("ini user roles baru:", userRoles);
                localStorage.setItem('email', email as string)
                localStorage.setItem("role", userRoles.join());
                router.push('/')
                
                return role;
            } else {
                throw new Error('Oops, something when wrong..');
            }
    
        } catch (error) {
            console.error("Failed to login:", error);
            throw error;
        }
    };
    
    const logout = () => {
        setIsAuthenticated(false);
        setUsername('');
        setRole(['']);
        localStorage.removeItem('email');
        router.push('/');
    };

    return <AuthContext.Provider value={{ username, isAuthenticated, login, logout, role }}>{children}</AuthContext.Provider>
}