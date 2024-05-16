"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPaket } from "@/actions/getPaket";
import { useAuth } from "@/contexts";

interface PaketData {
    jenis: string;
    harga: number;
}

const Paket: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [paketList, setPaketList] = useState<PaketData[]>([]);

    useEffect(() => {
        const fetchPaket = async () => {
            try {
                const data = await getPaket();
                setPaketList(data);
            } catch (error) {
                console.error("Failed to fetch paket:", error);
            }
        };

        if (isAuthenticated) {
            fetchPaket();
        }
    }, [isAuthenticated]);

    const handleSubscription = (paket: PaketData) => {
        console.log("Berlangganan paket:", paket);
        // Redirect to payment page with selected package
        router.push(`/feature/langganan/pembayaran?jenis=${encodeURIComponent(paket.jenis)}&harga=${encodeURIComponent(paket.harga.toString())}`);
    };

    const handleTransactionHistory = () => {
        console.log("Menuju riwayat transaksi");
        // Implementasi navigasi ke riwayat transaksi
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-[600px] bg-white rounded-xl shadow-md p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Langganan Paket</h1>
                    <button
                        type="button"
                        onClick={handleTransactionHistory}
                        className="bg-marmut-light-brown-900 text-white py-1 px-2 rounded-md text-sm"
                    >
                        Riwayat Transaksi
                    </button>
                </div>
                <table className="w-full bg-marmut-50 border border-marmut-green-700 rounded-xl">
                    <thead>
                    <tr className="bg-marmut-green-600 text-white">
                        <th className="p-3 rounded-tl-xl">Paket</th>
                        <th className="p-3">Harga</th>
                        <th className="p-3 rounded-tr-xl"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {paketList.map((paket) => (
                        <tr key={paket.jenis} className="bg-marmut-100">
                            <td className="p-3">{paket.jenis}</td>
                            <td className="p-3">Rp{paket.harga.toLocaleString()}</td>
                            <td className="p-3">
                                <button
                                    type="button"
                                    onClick={() => handleSubscription(paket)}
                                    className="bg-marmut-light-brown-900 text-white py-1 px-2 rounded-md text-sm"
                                >
                                    Beli
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Paket;
