"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts";
import { getTransactionHistory } from "@/actions/feature/getTransactionHistory";

const RiwayatTransaksi: React.FC = () => {
    const router = useRouter();
    const { username, isAuthenticated } = useAuth();
    const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            if (isAuthenticated && username) {
                try {
                    const history = await getTransactionHistory(username);
                    setTransactionHistory(history);
                } catch (error) {
                    console.error("Failed to fetch transaction history:", error);
                }
            }
        };

        fetchTransactionHistory();
    }, [isAuthenticated, username]);

    return (
        <div className="px-8 py-6 bg-marmut-50 rounded-xl shadow-md">
            <h1 className="text-xl font-bold mb-4">RIWAYAT TRANSAKSI PAKET</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse rounded-xl">
                    <thead>
                    <tr className="bg-marmut-green-600 text-white">
                        <th className="py-2 px-3 rounded-tl-xl">Jenis</th>
                        <th className="py-2 px-3">Tanggal Dimulai</th>
                        <th className="py-2 px-3">Tanggal Berakhir</th>
                        <th className="py-2 px-3">Metode Pembayaran</th>
                        <th className="py-2 px-3 rounded-tr-xl">Nominal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactionHistory.map((transaction, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td className={`py-2 px-3 ${index === transactionHistory.length - 1 ? 'rounded-bl-xl' : ''} bg-marmut-green-000`}>{transaction.jenis_paket}</td>
                            <td className={`py-2 px-3 bg-marmut-green-000`}>{new Date(transaction.timestamp_dimulai).toLocaleString()}</td>
                            <td className={`py-2 px-3 bg-marmut-green-000`}>{new Date(transaction.timestamp_berakhir).toLocaleString()}</td>
                            <td className={`py-2 px-3 bg-marmut-green-000`}>{transaction.metode_bayar}</td>
                            <td className={`py-2 px-3 ${index === transactionHistory.length - 1 ? 'rounded-br-xl' : ''} bg-marmut-green-000`}>Rp{transaction.nominal.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => router.back()} className="bg-marmut-green-600 text-white py-2 px-4 rounded-md mt-4">Kembali</button>
        </div>
    );
}

export default RiwayatTransaksi;
