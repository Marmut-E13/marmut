"use client"

import React, { useEffect, useState } from 'react';
import { FaMoneyCheckAlt } from "react-icons/fa";
import { fetchRoyalti } from '@/actions/royalti/getRoyalti';
import { useAuth } from '@/contexts';

const Royalti = () => {
    const { email } = useAuth();
    const [royalties, setRoyalties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoyalties = async () => {
            if (!email) return;
            try {
                const response = await fetchRoyalti(email);
                console.log(response)
                if ('error' in response) {
                    throw new Error(response.error);
                }
                setRoyalties(response);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRoyalties();
    }, [email]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex justify-center items-center min-h-screen w-full" style={{ backgroundColor: '#DDA15E' }}>
            <div className="w-full max-w-4xl shadow-lg rounded-xl p-[55px] my-8 mx-[120px]" style={{ borderColor: '#DDA15E', backgroundColor: '#FEFAE0', border: '2px solid #283618' }}>
                <h1 className="text-2xl font-bold mb-4 text-center" style={{ color: '#283618' }}>List Royalti</h1>
                <div className="overflow-x-auto">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="border-b-2" style={{ borderColor: '#606C38' }}>
                                <th style={{ color: '#283618' }}>Judul Lagu</th>
                                <th style={{ color: '#283618' }}>Judul Album</th>
                                <th style={{ color: '#283618' }}>Total Play</th>
                                <th style={{ color: '#283618' }}>Total Download</th>
                                <th style={{ color: '#283618', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><FaMoneyCheckAlt /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {royalties.map((royalti, index) => (
                                <tr key={index}>
                                    <td>{royalti.title}</td>
                                    <td>{royalti.album}</td>
                                    <td>{royalti.total_play}</td>
                                    <td>{royalti.total_download}</td>
                                    <td>{`Rp ${royalti.total_royalti}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Royalti;