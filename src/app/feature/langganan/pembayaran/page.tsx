"use client"

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";

const Paket: React.FC = () => {
    const router = useRouter();
    const [selectedPackage, setSelectedPackage] = useState<string>("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Redirect to payment page with selected package and payment method
        router.push(`/payment?package=${selectedPackage}&method=${selectedPaymentMethod}`);
    }

    const handleSubscription = (paket: string) => {
        // Set selected package when subscription button is clicked
        setSelectedPackage(paket);
        console.log("Berlangganan paket:", paket);
    }

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Set selected payment method when dropdown value changes
        setSelectedPaymentMethod(e.target.value);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-marmut-100 to-marmut-200">
            <form onSubmit={handleSubmit} className="w-[600px] bg-white rounded-xl shadow-md p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-marmut-green-700">Langganan Paket</h1>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-marmut-green-700">Informasi Paket yang Ingin Dibeli:</h2>
                    <table className="w-full">
                        <tbody>
                        <tr>
                            <td className="rounded-lg p-3 text-marmut-green-700">Jenis</td>
                            <td className="rounded-lg p-3">1 Bulan</td>
                        </tr>
                        <tr>
                            <td className="rounded-lg p-3 text-marmut-green-700">Harga</td>
                            <td className="rounded-lg p-3">Rp54.900</td> {/* Anda dapat menggantinya dengan harga dinamis berdasarkan paket yang dipilih */}
                        </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-col">
                        <label htmlFor="paymentMethod" className="text-lg font-semibold text-marmut-green-700">Metode Pembayaran:</label>
                        <select id="paymentMethod" name="paymentMethod" value={selectedPaymentMethod} onChange={handlePaymentMethodChange} className="border border-marmut-green-700 rounded-lg py-2 px-4">
                            <option value="">Pilih metode pembayaran</option>
                            <option value="transfer_bank">Transfer Bank</option>
                            <option value="kartu_kredit">Kartu Kredit</option>
                            <option value="e_wallet">E-Wallet</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="bg-marmut-green-700 text-white py-2 px-4 rounded-md mt-4 hover:bg-marmut-green-800 transition-colors">Submit</button>
            </form>
        </div>
    )
}

export default Paket;
