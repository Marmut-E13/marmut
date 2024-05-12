import React from 'react';

const DaftarLagu = () => {
  // Data dummy untuk daftar lagu
  const laguList = [
    { judul: 'Sparks', durasi: '4 menit', totalPlay: 320, totalDownload: 54 },
    { judul: 'Shiver', durasi: '3 menit', totalPlay: 216, totalDownload: 30 },
    // ... tambahkan lebih banyak lagu jika diperlukan
  ];

  return (
    <div className="bg-[#DDA15E] min-h-screen flex flex-col items-center justify-start pt-20">
      <div className="list-lagu-container w-full max-w-4xl shadow-lg p-4 mb-8 bg-white rounded-lg" style={{ borderColor: '#DDA15E', backgroundColor: '#FEFAE0', border: '2px solid #283618' }}>
        <h2 className="text-center font-bold text-lg mb-4">DAFTAR LAGU PADA PARACHUTES</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#DDA15E]">
              <th className="border border-gray-300 p-2 text-center">Judul</th>
              <th className="border border-gray-300 p-2 text-center">Durasi</th>
              <th className="border border-gray-300 p-2 text-center">Total Play</th>
              <th className="border border-gray-300 p-2 text-center">Total Download</th>
              <th className="border border-gray-300 p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {laguList.map((lagu, index) => (
              <tr key={index} className="hover:bg-white">
                <td className="border border-gray-300 p-2 text-center">{lagu.judul}</td>
                <td className="border border-gray-300 p-2 text-center">{lagu.durasi}</td>
                <td className="border border-gray-300 p-2 text-center">{lagu.totalPlay}</td>
                <td className="border border-gray-300 p-2 text-center">{lagu.totalDownload}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="bg-[#283618] hover:bg-[#A0522D] text-[#FEFAE0] py-1 px-2 rounded">Lihat Detail</button>
                  <button className="bg-[#283618] hover:bg-[#A0522D] text-[#FEFAE0] py-1 px-2 rounded ml-2">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarLagu;