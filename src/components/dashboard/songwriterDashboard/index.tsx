import React, { useState, useEffect } from "react";

const SongwriterDashboard: React.FC = () => {
    // Data lagu milik songwriter
    const [userSongs, setUserSongs] = useState<string[]>([]);

    // Memuat daftar lagu milik songwriter ketika komponen dimuat
    useEffect(() => {
        // Simulasi penggunaan data lagu milik songwriter dari server atau penyimpanan lokal
        // Misalnya, dapat diambil dari API atau penyimpanan lokal seperti Local Storage
        const dummyUserSongs = ["My Song 1", "My Song 2", "My Song 3"];
        setUserSongs(dummyUserSongs);
    }, []);

    return (
        <div className="flex flex-col h-screen w-screen py-12 px-12 items-center gap-5">
            <div className="flex flex-col w-full items-start gap-3">
                <h1 className="text-2xl font-bold">Dashboard SongWriter</h1>
            </div>
            <div className="flex flex-col w-full items-start gap-3">
                <div className="grid grid-cols-3 gap-4">
                    {userSongs.length > 0 ? (
                        userSongs.map((song, index) => (
                            <div key={index} className="bg-white shadow-md rounded-md p-4">
                                <p className="text-lg font-semibold">{song}</p>
                                <button className="bg-marmut-green-600 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-3">
                                    Detail
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Belum Memiliki Lagu</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SongwriterDashboard;
