import React from 'react';

const AlbumAndSongs = () => {
  // Data dummy
  const albums = [
    { title: 'Parachutes', label: 'Parlophone', numSongs: 8, totalDuration: '50 menit' },
    { title: 'Music of the Spheres', label: 'Warner Music Group', numSongs: 10, totalDuration: '72 menit' },
  ];

  return (
    <div className="bg-[#DDA15E] min-h-screen flex flex-col items-center justify-start pt-20 pb-10">
      {/* <div className="create-album-container w-full max-w-md shadow-lg p-4 mb-8 bg-white rounded-lg" style={{ borderColor: '#DDA15E', backgroundColor: '#FEFAE0', border: '2px solid #283618' }}>
        <h2 className="text-center font-bold text-lg mb-4" style={{ color: '#606C38' }}>CREATE ALBUM</h2>
        <form className="flex flex-col items-center justify-center">
          <div className="w-full flex justify-start mb-4">
            <label htmlFor="title" className="mr-4" style={{ color: '#606C38' }}>Judul:</label>
            <input type="text" id="title" name="title" placeholder="Judul Album" className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }} />
          </div>
          <div className="w-full flex justify-start mb-4">
            <label htmlFor="label" className="mr-4" style={{ color: '#606C38' }}>Label:</label>
            <select id="label" name="label" className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }}>
              <option>Parlophone</option>
              <option>Warner Music Group</option>
              <option>Universal Music Group</option>
            </select>
          </div>
          <button className="bg-[#283618] text-[#FEFAE0] py-2 px-6 rounded hover:bg-[#DDA15E] w-full">Submit</button>
        </form>
      </div> */}
      <div className="list-album-container w-full max-w-4xl shadow-lg p-4 bg-white rounded-lg mb-10" style={{ borderColor: '#DDA15E', backgroundColor: '#FEFAE0', border: '2px solid #283618' }}>
        <h2 className="text-center font-bold text-lg mb-4" style={{ color: '#606C38' }}>LIST ALBUM</h2> {/* Header text color updated */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#DDA15E]"> {/* Table header background color updated */}
              <th className="border border-gray-300 p-2 font-semibold text-center">Judul</th>
              <th className="border border-gray-300 p-2 font-semibold text-center">Label</th>
              <th className="border border-gray-300 p-2 font-semibold text-center">Jumlah Lagu</th>
              <th className="border border-gray-300 p-2 font-semibold text-center">Total Durasi</th>
              <th className="border border-gray-300 p-2 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album, index) => (
              <tr key={index} className="hover:bg-[#FEFAE0]"> {/* Hover background color updated */}
                <td className="border border-gray-300 p-2 text-center">{album.title}</td>
                <td className="border border-gray-300 p-2 text-center">{album.label}</td>
                <td className="border border-gray-300 p-2 text-center">{album.numSongs}</td>
                <td className="border border-gray-300 p-2 text-center">{album.totalDuration}</td>
                <td className="border border-gray-300 p-2 flex flex-col items-center space-y-2">
                  <a href={`/view-songs?album=${encodeURIComponent(album.title)}`} className="bg-[#283618] text-[#FEFAE0] py-1 px-2 rounded hover:bg-[#DDA15E] w-full text-center">Lihat Daftar Lagu</a> {}
                  <a href={`/create-songs?album=${encodeURIComponent(album.title)}`} className="bg-[#283618] text-[#FEFAE0] py-1 px-2 rounded hover:bg-[#DDA15E] w-full text-center">Tambah Lagu</a> {}
                  <button className="bg-[#283618] text-[#FEFAE0] py-1 px-2 rounded hover:bg-[#DDA15E] w-full">Hapus</button> {/* Button colors updated */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumAndSongs;