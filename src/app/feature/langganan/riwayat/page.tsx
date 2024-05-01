"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

const RiwayatTransaksi: React.FC = () => {
    const router = useRouter();
    const [transactionHistory, setTransactionHistory] = useState<any[]>([
        {
            type: "1 Bulan",
            startDate: "8 April 2024, 23:00",
            endDate: "8 Mei 2024, 23:00",
            paymentMethod: "E-Wallet",
            amount: "Rp54.900"
        },
        // Tambahkan data riwayat transaksi lainnya di sini
    ]);

    return (
        <div className="px-8 py-6 bg-stonks-50 rounded-xl shadow-md">
            <h1 className="text-xl font-bold mb-4">RIWAYAT TRANSAKSI PAKET</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-stonks-700 rounded-xl">
                    <thead>
                    <tr className="bg-stonks-600 text-white">
                        <th className="border border-stonks-700 py-2 px-3 rounded-tl-xl">Jenis</th>
                        <th className="border border-stonks-700 py-2 px-3">Tanggal Dimulai</th>
                        <th className="border border-stonks-700 py-2 px-3">Tanggal Berakhir</th>
                        <th className="border border-stonks-700 py-2 px-3">Metode Pembayaran</th>
                        <th className="border border-stonks-700 py-2 px-3 rounded-tr-xl">Nominal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactionHistory.map((transaction, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td className={`border border-stonks-700 py-2 px-3 ${index === transactionHistory.length - 1 ? 'rounded-bl-xl' : ''}`}>{transaction.type}</td>
                            <td className="border border-stonks-700 py-2 px-3">{transaction.startDate}</td>
                            <td className="border border-stonks-700 py-2 px-3">{transaction.endDate}</td>
                            <td className="border border-stonks-700 py-2 px-3">{transaction.paymentMethod}</td>
                            <td className={`border border-stonks-700 py-2 px-3 ${index === transactionHistory.length - 1 ? 'rounded-br-xl' : ''}`}>{transaction.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => router.back()} className="bg-stonks-600 text-white py-2 px-4 rounded-md mt-4">Kembali</button>
        </div>
    );
}

export default RiwayatTransaksi;
