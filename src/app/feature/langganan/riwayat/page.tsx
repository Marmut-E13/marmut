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
        {
            type: "3 Bulan",
            startDate: "12 Mei 2024, 20:00",
            endDate: "12 Agustus 2024, 20:00",
            paymentMethod: "Kartu Kredit",
            amount: "Rp150.000"
        },
        {
            type: "6 Bulan",
            startDate: "1 Juni 2024, 12:00",
            endDate: "1 Desember 2024, 12:00",
            paymentMethod: "Transfer Bank",
            amount: "Rp300.000"
        },
        {
            type: "12 Bulan",
            startDate: "5 Juli 2024, 08:00",
            endDate: "5 Juli 2025, 08:00",
            paymentMethod: "E-Wallet",
            amount: "Rp550.000"
        },
        {
            type: "1 Bulan",
            startDate: "10 Agustus 2024, 15:00",
            endDate: "10 September 2024, 15:00",
            paymentMethod: "Transfer Bank",
            amount: "Rp60.000"
        }
    ]);

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
                            <td className={`py-2 px-3 ${index === transactionHistory.length - 1 ? 'rounded-bl-xl' : ''} bg-marmut-green-000`}>{transaction.type}</td>
                            <td className={`py-2 px-3 bg-marmut-green-000`}>{transaction.startDate}</td>
                            <td className={`py-2 px-3 bg-marmut-green-000`}>{transaction.endDate}</td>
                            <td className={`py-2 px-3 bg-marmut-green-000`}>{transaction.paymentMethod}</td>
                            <td className={`py-2 px-3 ${index === transactionHistory.length - 1 ? 'rounded-br-xl' : ''} bg-marmut-green-000`}>{transaction.amount}</td>
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
