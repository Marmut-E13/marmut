"use client"

import { useState } from "react";

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]); // Menyimpan hasil pencarian

    const handleSearch = () => {
        const dummyData = [
            { type: "Song", title: "Happy Mood", artist: "Medey" },
            { type: "Song", title: "Tuturututu", artist: "Hundy" },
            { type: "Podcast", title: "His Crazy", podcaster: "Frezy" },
            { type: "Podcast", title: "Gil Crush", podcaster: "Sally" },
            { type: "User Playlist", title: "Sad", creator: "Uni" },
            { type: "User Playlist", title: "My Love", creator: "Sabrina" },
        ];

        const results = dummyData.filter(item =>
            item.type.toLowerCase().includes(query.toLowerCase()),
        );

        setSearchResults(results);
    };

    const handleViewDetail = (title: string, type: string) => {
        console.log(`View detail of ${type}: ${title}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Search</h1>
            <div className="flex items-center border border-gray-300 rounded-md p-2 mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-grow focus:outline-none"
                />
                <button onClick={handleSearch} className="bg-marmut-green-600 text-white py-2 px-4 rounded-md ml-2">Search</button>
            </div>
            {searchResults.length === 0 ? (
                <p>Maaf, pencarian untuk "{query}" tidak ditemukan</p>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                    <tr className="bg-marmut-green-600 text-white">
                        <th className="border p-3">Tipe</th>
                        <th className="border p-3">Judul lagu</th>
                        <th className="border p-3">Oleh</th>
                        <th className="border p-3">Detail</th>
                    </tr>
                    </thead>
                    <tbody>
                    {searchResults.map((item, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td className="border p-3">{item.type}</td>
                            <td className="border p-3">{item.title}</td>
                            <td className="border p-3">{item.artist || item.podcaster || item.creator}</td>
                            <td className="border p-3">
                                <button onClick={() => handleViewDetail(item.title, item.type)} className="bg-marmut-green-600 text-white py-1 px-2 rounded-md mr-2">View</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchPage;
