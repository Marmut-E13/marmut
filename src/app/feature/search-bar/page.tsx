"use client"

import { useState } from "react";
import { useRouter } from "next/router";

const SearchBar: React.FC = () => {
    const router = useRouter();
    const [query, setQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]); // Menyimpan hasil pencarian

    const handleSearch = () => {
        // Lakukan pencarian berdasarkan query
        // Misalnya, Anda dapat mengirimkan permintaan ke server dengan query sebagai parameter
        // Kemudian, simpan hasil pencarian ke dalam state searchResults
        // Contoh sederhana: setSearchResults([...dummySearchResults]); // Dummy results for demonstration

        // Untuk alasan demonstrasi, saya akan menggunakan data dummy
        const dummySearchResults = [
            { type: "Song", title: "Song1", artist: "Artist1" },
            { type: "Podcast", title: "Podcast1", podcaster: "Podcaster1" },
            { type: "Playlist", title: "Playlist1", creator: "Creator1" },
            // Tambahkan hasil pencarian lainnya di sini
        ];

        const filteredResults = dummySearchResults.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const handleViewContent = (type: string, title: string) => {
        // Arahkan pengguna ke halaman detail konten berdasarkan tipe dan judulnya
        router.push(`/${type.toLowerCase()}/${title}`);
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Query"
                className="border border-stonks-700 rounded-l-md py-2 px-3 focus:outline-none"
            />
            <button onClick={handleSearch} className="bg-stonks-600 text-white py-2 px-4 rounded-r-md">CARI</button>
            {searchResults.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Hasil Pencarian:</h2>
                    <ul className="mt-2">
                        {searchResults.map((result, index) => (
                            <li key={index} className="mt-1">
                                <span className="text-blue-600 cursor-pointer" onClick={() => handleViewContent(result.type, result.title)}>
                                    {result.title} ({result.type})
                                </span>
                                {result.type === "Song" && <span> oleh {result.artist}</span>}
                                {result.type === "Podcast" && <span> oleh {result.podcaster}</span>}
                                {result.type === "Playlist" && <span> oleh {result.creator}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
