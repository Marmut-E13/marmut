"use client"

import { useRouter } from "next/navigation"

export const AuthenticatedNavbar: React.FC = () => {
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('email')
        router.push('/')
    }

    return (
        <div className="flex flex-row w-screen bg-stonks-900 z-[999] fixed px-5 py-3 justify-between items-center">
            <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
    )
}