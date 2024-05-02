"use client"

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";

const Paket: React.FC = () => {
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        // TODO
    }

    const handleSubscription = (paket: string) => {
        // TODO
        console.log("Berlangganan paket:", paket);
    }

    const handleTransactionHistory = () => {
        // TODO
        console.log("Menuju riwayat transaksi");
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-[600px] bg-white rounded-xl shadow-md p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Langganan Paket</h1>
                    <button onClick={handleTransactionHistory} className="bg-marmut-light-brown-900 text-white py-1 px-2 rounded-md text-sm">Riwayat Transaksi</button>
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
                    <tr>
                        <td className="p-3">1 bulan</td>
                        <td className="p-3">Rp54.900</td>
                        <td className="p-3">
                            <button onClick={() => handleSubscription("1 bulan")} className="bg-marmut-light-brown-900 text-white py-1 px-2 rounded-md text-sm">Beli</button>
                        </td>
                    </tr>
                    <tr className="bg-marmut-100">
                        <td className="p-3">3 bulan</td>
                        <td className="p-3">Rp154.700</td>
                        <td className="p-3">
                            <button onClick={() => handleSubscription("3 bulan")} className="bg-marmut-light-brown-900 text-white py-1 px-2 rounded-md text-sm">Beli</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3">6 bulan</td>
                        <td className="p-3">Rp299.400</td>
                        <td className="p-3">
                            <button onClick={() => handleSubscription("6 bulan")} className="bg-marmut-light-brown-900 text-white py-1 px-2 rounded-md text-sm">Beli</button>
                        </td>
                    </tr>
                    <tr className="bg-marmut-100">
                        <td className="p-3">1 tahun</td>
                        <td className="p-3">Rp549.000</td>
                        <td className="p-3">
                            <button onClick={() => handleSubscription("1 tahun")} className="bg-marmut-light-brown-900 text-white py-1 px-2 rounded-md text-sm">Beli</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Paket;
