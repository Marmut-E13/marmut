import React from 'react';

const LabelDashboard = () => {
  // Dummy data for one logged-in label
  const labelInfo = {
    albums: [
      { title: 'Album1', songs: 3, duration: '60 menit' },
      { title: 'Album2', songs: 5, duration: '120 menit' },
    ],
  };

  return (
    <div className="mt-5">
      <h2 className="text-[#283618] font-semibold mb-3">Daftar Album</h2>
      <div className="overflow-x-auto bg-[#283618] rounded-lg p-4"> {}
        <table className="w-full text-left">
          <thead>
            <tr className="text-white bg-[#283618]">
              <th className="p-3">Judul</th>
              <th className="p-3">Jumlah Lagu</th>
              <th className="p-3">Total Durasi</th>
            </tr>
          </thead>
          <tbody>
            {labelInfo.albums.length > 0 ? (
              labelInfo.albums.map((album, index) => (
                <tr key={index} className="bg-white">
                  <td className="p-3">{album.title}</td>
                  <td className="p-3">{album.songs}</td>
                  <td className="p-3">{album.duration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-3 text-center">Belum Memproduksi Album</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabelDashboard;