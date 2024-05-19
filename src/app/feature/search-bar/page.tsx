"use client"

import { useState } from "react";
import { getSearchResult } from "@/actions/feature/getSearchResult"; // Sesuaikan path sesuai struktur proyekmu


const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]); // Menyimpan hasil pencarian

    const handleSearch = async () => {
        try {
            const results = await getSearchResult(query); // Panggil fungsi untuk melakukan pencarian
            setSearchResults(results);
        } catch (error) {
            console.error("Failed to search:", error);
            // Handle error
        }
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
                    className="flex-grow focus:outline-none px-4 py-2 rounded-l-md border-r-0"
                />
                <button onClick={handleSearch} className="bg-marmut-green-600 text-white py-2 px-4 rounded-r-md border-l-0">Search</button>
            </div>
            {searchResults.length === 0 ? (
                <p className="text-gray-600">Maaf, pencarian untuk "{query}" tidak ditemukan</p>
            ) : (
                <table className="w-full border-collapse border mt-4">
                    <thead>
                    <tr className="bg-marmut-green-600 text-white">
                        <th className="border p-3">Tipe</th>
                        <th className="border p-3">Judul lagu</th>
                        <th className="border p-3">Oleh</th>
                    </tr>
                    </thead>
                    <tbody>
                    {searchResults.map((item, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td className="border p-3">{item.type}</td>
                            <td className="border p-3">{item.title}</td>
                            <td className="border p-3">{item.by}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchPage;
