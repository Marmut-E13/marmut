"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts";
import { saveTransaction } from "@/actions/feature/saveTransaction";

const Pembayaran: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { email, isAuthenticated } = useAuth();
    const [paketJenis, setPaketJenis] = useState<string | null>(null);
    const [paketHarga, setPaketHarga] = useState<number | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");

    useEffect(() => {
        const jenis = searchParams.get("jenis");
        const harga = searchParams.get("harga");
        if (jenis && harga) {
            setPaketJenis(jenis);
            setPaketHarga(parseFloat(harga));
        }
    }, [searchParams]);

    const handleSubmit = async () => {
        if (!isAuthenticated || !email || !paketJenis || paketHarga === null) {
            console.error("User is not authenticated or package details are missing");
            return;
        }
        try {
            const timestampDimulai = new Date().toISOString();
            const timestampBerakhir = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();

            const transactionData = {
                jenis_paket: paketJenis,
                email: email,
                timestamp_dimulai: timestampDimulai,
                timestamp_berakhir: timestampBerakhir,
                metode_bayar: selectedPaymentMethod,
                nominal: paketHarga
            };

            await saveTransaction(transactionData);

            router.push("/");
        } catch (error) {
            console.error("Failed to save transaction:", error);
        }
    };

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPaymentMethod(e.target.value);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-marmut-100 to-marmut-200">
            <div className="w-[600px] bg-white rounded-xl shadow-md p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-marmut-green-700">Pembayaran Paket</h1>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-marmut-green-700">Informasi Paket yang Dipilih:</h2>
                    <table className="w-full">
                        <tbody>
                        <tr>
                            <td className="rounded-lg p-3 text-marmut-green-700">Jenis</td>
                            <td className="rounded-lg p-3">{paketJenis || "Loading..."}</td>
                        </tr>
                        <tr>
                            <td className="rounded-lg p-3 text-marmut-green-700">Harga</td>
                            <td className="rounded-lg p-3">Rp{paketHarga !== null ? paketHarga.toLocaleString() : "Loading..."}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-col">
                        <label htmlFor="paymentMethod" className="text-lg font-semibold text-marmut-green-700">Metode Pembayaran:</label>
                        <select id="paymentMethod" name="paymentMethod" value={selectedPaymentMethod} onChange={handlePaymentMethodChange} className="border border-marmut-green-700 rounded-lg py-2 px-4">
                            <option value="">Pilih metode pembayaran</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="E-Wallet">E-Wallet</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleSubmit} className="bg-marmut-green-700 text-white py-2 px-4 rounded-md mt-4 hover:bg-marmut-green-800 transition-colors">Submit</button>
            </div>
        </div>
    );
};

const SuspendedPembayaran = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Pembayaran />
    </Suspense>
);

export default SuspendedPembayaran;
