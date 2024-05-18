"use client"

import React, { useEffect, useState } from 'react';
import { fetchSongsByAlbum, fetchAlbumById, deleteSong } from '@/actions/albums/albumAndSongs/getAlbum'; 

type Song = {
  id: string;
  title: string;
  duration: string;
  totalplay: number;
  totaldownload: number;
};

type Album = {
  id: string;
  title: string;
};

type SongsResponse = Song[] | { error: string };
type AlbumResponse = Album | { error: string };

const DaftarLagu = ({ params }: { params: { idAlbum: string } }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!params.idAlbum) return;
      setLoading(true);
      try {
        const songsResponse: SongsResponse = await fetchSongsByAlbum(params.idAlbum);
        const albumResponse: AlbumResponse = await fetchAlbumById(params.idAlbum);

        if ('error' in songsResponse) {
          throw new Error(songsResponse.error);
        }
        console.log('Album response:', songsResponse);
        setSongs(songsResponse);

        if ('error' in albumResponse) {
          throw new Error(albumResponse.error);
        }
        setAlbum(albumResponse);
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

    fetchData();
  }, [params.idAlbum]);

  const handleDeleteSong = async (songId: string) => {
    const response = await deleteSong(songId);
    if (response.success) {
      refreshSongs();
    } else {
      setError(response.error || 'Failed to delete song');
    }
  };

  const refreshSongs = async () => {
    const updatedSongs = await fetchSongsByAlbum(params.idAlbum);
    if (!('error' in updatedSongs)) {
      setSongs(updatedSongs);
    } else {
      setError(updatedSongs.error || 'Failed to fetch updated songs');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#DDA15E] min-h-screen flex flex-col items-center justify-start pt-20">
      <div className="list-lagu-container w-full max-w-4xl shadow-lg p-4 mb-8 bg-white rounded-lg" style={{ borderColor: '#DDA15E', backgroundColor: '#FEFAE0', border: '2px solid #283618' }}>
        <h2 className="text-center font-bold text-lg mb-4">Daftar Lagu Pada {album?.title}</h2>
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
            {songs.map((song, index) => (
              <tr key={index} className="hover:bg-white">
                <td className="border border-gray-300 p-2 text-center">{song.title}</td>
                <td className="border border-gray-300 p-2 text-center">{song.duration}</td>
                <td className="border border-gray-300 p-2 text-center">{song.totalplay}</td>
                <td className="border border-gray-300 p-2 text-center">{song.totaldownload}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="bg-[#283618] hover:bg-[#A0522D] text-[#FEFAE0] py-1 px-2 rounded">Lihat Detail</button>
                  <button
                    className="bg-[#283618] hover:bg-[#A0522D] text-[#FEFAE0] py-1 px-2 rounded ml-2"
                    onClick={() => handleDeleteSong(song.id)}
                  >
                    Hapus
                  </button>
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