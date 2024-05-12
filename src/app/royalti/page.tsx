"use client"

import { usePathname } from "next/navigation";
import { FaMoneyCheckAlt } from "react-icons/fa";

const royalti: React.FC = () => {
    const pathname = usePathname();

    // Placeholder
    const royalties = [
        { title: "Yellow", album: "Parachutes", totalPlay: 3, totalDownload: 0, totalRoyalti: "Rp 450000" },
        { title: "Sparks", album: "Parachutes", totalPlay: 2, totalDownload: 2, totalRoyalti: "Rp 520000" },
    ];

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
                                    <td style={{ color: '#283618' }}>{royalti.title}</td>
                                    <td style={{ color: '#283618' }}>{royalti.album}</td>
                                    <td style={{ color: '#283618' }}>{royalti.totalPlay}</td>
                                    <td style={{ color: '#283618' }}>{royalti.totalDownload}</td>
                                    <td style={{ color: '#283618', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{royalti.totalRoyalti}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default royalti;