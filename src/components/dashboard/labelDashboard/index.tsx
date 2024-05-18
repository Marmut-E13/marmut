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
    <div className="flex flex-col items-start w-full gap-2">
      <text className="font-semibold text-2xl">Daftar Album</text>

      <div className="flex flex-wrap gap-4">
        {labelInfo.albums.length > 0 ? (
          labelInfo.albums.map((album, index) => (
            <div key={index} className="flex bg-marmut-dark-green-100 p-[10px] rounded-lg h-[140px] w-[240px] text-marmut-000 flex-col justify-center items-center">
              <text className="font-semibold">{album.title}</text>
              <text>Jumlah Lagu: {album.songs}</text>
              <text>Total Durasi: {album.duration}</text>
            </div>
          ))
        ) : (
          <div className="flex bg-marmut-dark-green-100 p-[10px] rounded-lg h-[140px] w-[240px] text-marmut-000 justify-center items-center">
            Belum Memproduksi Album
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelDashboard;