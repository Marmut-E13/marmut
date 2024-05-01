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
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-[600px] bg-white rounded-xl shadow-md p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Langganan Paket</h1>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Informasi Paket yang Ingin Dibeli:</h2>
                    <table className="w-full">
                        <tbody>
                        <tr>
                            <td className="border border-stonks-700 rounded-lg">Jenis</td>
                            <td className="border border-stonks-700 rounded-lg">{selectedPackage}</td>
                        </tr>
                        <tr>
                            <td className="border border-stonks-700 rounded-lg">Harga</td>
                            <td className="border border-stonks-700 rounded-lg">Rp54.900</td> {/* You can replace this with dynamic price based on selected package */}
                        </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-col">
                        <label htmlFor="paymentMethod" className="text-lg font-semibold">Metode Pembayaran:</label>
                        <select id="paymentMethod" name="paymentMethod" value={selectedPaymentMethod} onChange={handlePaymentMethodChange} className="border border-stonks-700 rounded-lg py-2 px-4">
                            <option value="">Pilih metode pembayaran</option>
                            <option value="transfer_bank">Transfer Bank</option>
                            <option value="kartu_kredit">Kartu Kredit</option>
                            <option value="e_wallet">E-Wallet</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="bg-stonks-600 text-white py-2 px-4 rounded-md mt-4">Submit</button>
            </form>
        </div>
    )
}

export default Paket;
