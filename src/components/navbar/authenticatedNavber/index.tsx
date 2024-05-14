"use client"

import { useAuth } from "@/contexts"
import { useRouter } from "next/navigation"
import { useState } from "react";

export const AuthenticatedNavbar: React.FC = () => {
    const router = useRouter();
    const { logout, role } = useAuth();

    console.log("ini role:", role);


    return (
<<<<<<< HEAD
        <div className="flex flex-row w-screen bg-marmut-dark-green-300 z-[999] fixed px-5 justify-between items-center">
            <text className="select-none text-marmut-100 font-bold text-[18px] py-3">Marmut-E13</text>

            <div className="flex flex-row gap-3">
                <div className="flex flex-row gap-3 text-marmut-000 ">
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Dashboard</button>
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Chart</button>
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Playlist</button>
                    <button className="hover:bg-marmut-green-000 py-3 px-2">Subscribe</button>
                    {/*<button className="hover:bg-marmut-green-000 py-3 px-2">Download</button>*/}
                    {/*<button className="hover:bg-marmut-green-000 py-3 px-2">Manage</button>*/}


                    {/* <div className= "flex-col absolute top-[105%] w-full right-[220px] items-start max-w-[100px] overflow-y-auto rounded-b-md transition-all duration-300 text-black">


                        <div className="flex flex-row cursor-pointer bg-white hover:bg-marmut-100 gap-2 px-3 py-2 items-center font-medium">
                            Podcast
                        </div>

                        <div className="flex flex-row cursor-pointer bg-white hover:bg-marmut-100 gap-2 px-3 py-2 items-center font-medium">
                            Podcast
                        </div>

                        <div className="flex flex-row cursor-pointer bg-white hover:bg-marmut-100 gap-2 px-3 py-2 items-center font-medium">
                            Podcast
                        </div>

                        <div className="flex flex-row cursor-pointer bg-white hover:bg-marmut-100 gap-2 px-3 py-2 items-center font-medium">
                            Podcast
                        </div>

                    </div> */}
                    <button className="bg-marmut-brown-700 px-3 py-[6px] rounded-lg text-marmut-000">Logout</button>
                </div>

                <div className="py-3">
                    <input placeholder="Search" className="rounded-md px-1"/>
                </div>
=======
        <div className="flex flex-row w-screen bg-marmut-dark-green-300 z-[999] fixed gap-3 px-5 py-2 justify-between items-center h-[62px]">
            <div className="flex flex-row items-center gap-3">
                <div className="flex items-center flex-col pt-[6px]">
                    <div className="text-marmut-100 font-bold text-[18px] whitespace-nowrap leading-3">Marmut-E13</div>
                    <div className="rounded-md px-2 ml-2">
                        <text className="text-white text-xs leading-3">non-premium</text>
                    </div>
                </div>
            </div>

            <div className="flex w-[40%] justify-start">
                <input placeholder="Search" className="rounded-md px-3 w-full py-1"/>  
            </div>

            <div className="flex flex-row gap-3">
                <div className="flex flex-row gap-1 text-marmut-000 ">
                    <button className="hover:bg-marmut-green-100 px-[10px]" onClick={() => router.push('/dashboard')}>Dashboard</button>
                    {role.includes('pengguna') && <button className="hover:bg-marmut-green-100 px-[10px]">Chart</button>}
                    {role.includes('pengguna') && <button className="hover:bg-marmut-green-100 px-[10px]">Subscribe</button>} 
                    {role.includes('pengguna') && <button className="hover:bg-marmut-green-100 px-[10px]">Playlist</button>} 
                    {role.includes('premium') && <button className="hover:bg-marmut-green-100 px-[10px]">Download</button>} 
                    {role.includes('podcaster') && <button className="hover:bg-marmut-green-100 px-[10px]">Podcast</button>} 
                    {(role.includes('artist') || role.includes('songwriter')) && <button className="hover:bg-marmut-green-100 px-[10px] whitespace-nowrap">Album & Songs</button>} 
                    {role.includes('label') && <button className="hover:bg-marmut-green-100 px-[10px]">Album</button>} 
                    {(role.includes('artist') || role.includes('songwriter') || role.includes('label')) && <button className="hover:bg-marmut-green-100 px-[10px]">Royalty</button>} 
                </div>
                <button className="bg-marmut-brown-700 px-3 py-[6px] rounded-lg text-marmut-000" onClick={logout}>Logout</button>
>>>>>>> 72743a473cad2f3b15e29b7be8ecd1fd4b449d0c
            </div>
        </div>
    )
}