"use client"

import { useRouter } from "next/navigation"

export const AuthenticatedNavbar: React.FC = () => {
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('email')
        router.push('/')
    }

    return (
        <div className="flex flex-row w-screen bg-marmut-dark-green-300 z-[999] fixed px-5 justify-between items-center">
            <text className="select-none text-marmut-100 font-bold text-[18px] py-3">Marmut-E13</text>

            <div className="flex flex-row gap-3">
                <div className="flex flex-row gap-3 text-marmut-000 ">
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Dashboard</button>  
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Chart</button>
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Playlist</button>
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Subscribe</button>               
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Download</button>               
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Manage</button>
                    
                    
                    <div className= "flex-col absolute top-[105%] w-full right-[220px] items-start max-w-[100px] overflow-y-auto rounded-b-md transition-all duration-300 text-black">
                
                    
                        <div className="flex flex-row cursor-pointer bg-white hover:bg-marmut-100 gap-2 px-3 py-2 items-center font-medium">
                            Podcast
                        </div>

                        {/* <div className="flex flex-row cursor-pointer bg-white hover:bg-marmut-100 gap-2 px-3 py-2 items-center font-medium">
                            Podcast
                        </div>

                        <div className="flex flex-row cursor-pointer bg-white hover:bg-marmut-100 gap-2 px-3 py-2 items-center font-medium">
                            Podcast
                        </div>

                        <div className="flex flex-row cursor-pointer bg-white hover:bg-marmut-100 gap-2 px-3 py-2 items-center font-medium">
                            Podcast
                        </div> */}
                    
                    </div>
                    <button className="bg-marmut-brown-700 px-3 py-[6px] rounded-lg text-marmut-000">Logout</button>
                </div>

                <div className="py-3">
                    <input placeholder="Search" className="rounded-md px-1"/>  
                </div>
            </div>
        </div>
    )
}