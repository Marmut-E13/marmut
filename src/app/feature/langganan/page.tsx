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
                    <button onClick={handleTransactionHistory} className="bg-stonks-600 text-white py-2 px-4 rounded-md">Riwayat Transaksi</button>
                </div>
                <table className="w-full">
                    <thead>
                    <tr>
                        <th className="border border-stonks-700 rounded-lg">Paket</th>
                        <th className="border border-stonks-700 rounded-lg">Harga</th>
                        <th className="border border-stonks-700 rounded-lg"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-stonks-700 rounded-lg">1 bulan</td>
                        <td className="border border-stonks-700 rounded-lg">Rp54.900</td>
                        <td className="border border-stonks-700 rounded-lg">
                            <button onClick={() => handleSubscription("1 bulan")} className="bg-stonks-600 text-white py-2 px-4 rounded-md">Beli Paket</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-stonks-700 rounded-lg">3 bulan</td>
                        <td className="border border-stonks-700 rounded-lg">Rp154.700</td>
                        <td className="border border-stonks-700 rounded-lg">
                            <button onClick={() => handleSubscription("3 bulan")} className="bg-stonks-600 text-white py-2 px-4 rounded-md">Beli Paket</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-stonks-700 rounded-lg">6 bulan</td>
                        <td className="border border-stonks-700 rounded-lg">Rp299.400</td>
                        <td className="border border-stonks-700 rounded-lg">
                            <button onClick={() => handleSubscription("6 bulan")} className="bg-stonks-600 text-white py-2 px-4 rounded-md">Beli Paket</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-stonks-700 rounded-lg">1 tahun</td>
                        <td className="border border-stonks-700 rounded-lg">Rp549.000</td>
                        <td className="border border-stonks-700 rounded-lg">
                            <button onClick={() => handleSubscription("1 tahun")} className="bg-stonks-600 text-white py-2 px-4 rounded-md">Beli Paket</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Paket;
