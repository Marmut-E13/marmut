// "use client"

// import { loginUser, getUserData } from "@/actions/loginUser";
// import { useRouter } from "next/navigation";
// import React, { createContext, useContext, useEffect, useState } from "react";

// interface User {
//     name: string;
//     email: string;
//     artistId: string | null;
//     songwriterId: string | null;
// }
// interface AuthContextProps {
//     user: User | null;
//     username: string;
//     role: ('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[];
//     isAuthenticated: boolean;
//     login: (email: string, password: string) => Promise<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]>;
//     logout: () => void;
// }

// const AuthContext = createContext<AuthContextProps>({
//     user: null,
//     username: '',
//     role: [''],
//     isAuthenticated: false,
//     login: (email: string, password: string) => Promise.resolve([]),
//     logout: () => {}
// });

// export const useAuth = () => useContext(AuthContext);

// export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
//     children
// }) => {
//     const router = useRouter();

//     const [user, setUser] = useState<User | null>(null);
//     const [username, setUsername] = useState<string>('');
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [role, setRole] = useState<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]>(['']);

//     useEffect(() => {
//         const storedEmail = localStorage.getItem('email');
//         const storedIsAuthenticated = !!storedEmail;
//         setIsAuthenticated(storedIsAuthenticated);
//         setUsername(storedEmail || '');
//         setRole(localStorage.getItem("role") ? localStorage.getItem("role")?.split(",") as any : [''])
//     }, []);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (isAuthenticated && username) {
//                 const userData = await getUserData(username);
//                 setUser(userData);
//             }
//         };

//         fetchUserData();
//     }, [isAuthenticated, username]);

//     const login = async (email: string, password: string): Promise<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]> => {
//         try {
//             const userRoles = await loginUser(email, password);

//             if (userRoles !== undefined && userRoles !== null && userRoles[0] !== '') {
//                 setIsAuthenticated(true);
//                 setUsername(email);
//                 setRole(userRoles as ("" | "pengguna" | "podcaster" | "songwriter" | "artist" | 'label' | 'premium')[]);

//                 localStorage.setItem('email', email as string)
//                 localStorage.setItem("role", userRoles.join());
//                 router.push('/')

//                 return role;
//             } else {
//                 throw new Error('Oops, something went wrong..');
//             }

//         } catch (error) {
//             console.error("Failed to login:", error);
//             throw error;
//         }
//     };

//     const logout = () => {
//         setIsAuthenticated(false);
//         setUser(null);
//         setUsername('');
//         setRole(['']);
//         localStorage.removeItem('email');
//         router.push('/');
//     };

//     return <AuthContext.Provider value={{ user, username, isAuthenticated, login, logout, role }}>{children}</AuthContext.Provider>
// }

"use client"

import { loginUser, getUserData } from "@/actions/loginUser";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    email: string;
    name: string;
    idPemilikHakCipta: string | null;
    role: ('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[];
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    email: '',
    name: '',
    idPemilikHakCipta: null,
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

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [idPemilikHakCipta, setIdPemilikHakCipta] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]>(['']);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedName = localStorage.getItem('name');
        const storedIdPemilikHakCipta = localStorage.getItem('idPemilikHakCipta');
        const storedIsAuthenticated = !!storedEmail; 
        setIsAuthenticated(storedIsAuthenticated);
        setEmail(storedEmail || '');
        setName(storedName || '');
        setIdPemilikHakCipta(storedIdPemilikHakCipta);
        setRole(localStorage.getItem("role") ? localStorage.getItem("role")?.split(",") as any : [''])
    }, []);

    const login = async (email: string, password: string): Promise<('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'label' | 'premium')[]> => {
        try {
            const userRoles = await loginUser(email, password);
            const userData = await getUserData(email);
    
            if (userRoles !== undefined && userRoles !== null && userRoles[0] !== '') {
                setIsAuthenticated(true);
                setEmail(email);
                setName(userData.name);
                if (userData && userData.idPemilikHakCipta) {
                    setIdPemilikHakCipta(userData.idPemilikHakCipta);
                    localStorage.setItem('idPemilikHakCipta', userData.idPemilikHakCipta);
                }
                setRole(userRoles as ("" | "pengguna" | "podcaster" | "songwriter" | "artist" | 'label' | 'premium')[]);

                localStorage.setItem('email', email as string);
                localStorage.setItem('name', userData.name);
                localStorage.setItem("role", userRoles.join());
                router.push('/');
                
                return role;
            } else {
                throw new Error('Oops, something went wrong..');
            }
    
        } catch (error) {
            console.error("Failed to login:", error);
            throw error;
        }
    };
    
    const logout = () => {
        setIsAuthenticated(false);
        setEmail('');
        setName('');
        setIdPemilikHakCipta(null);
        setRole(['']);
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('idPemilikHakCipta');
        localStorage.removeItem('role');
        router.push('/');
    };

    return <AuthContext.Provider value={{ email, name, idPemilikHakCipta, isAuthenticated, login, logout, role }}>{children}</AuthContext.Provider>
}