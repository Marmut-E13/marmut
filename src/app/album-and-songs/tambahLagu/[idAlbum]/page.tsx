"use client"

import React, { useEffect, useState, FormEvent } from 'react';
import Select from 'react-select';
import { fetchSongwriters, fetchGenres, fetchAlbumById, fetchArtists, createSong, getArtist, getSongwriter } from '@/actions/albums/albumAndSongs/getAlbum';
import { useAuth } from "@/contexts";

type Album = {
  id: string;
  title: string;
};

interface SongData {
  albumId: string;
  judul: string;
  artistId: string;
  songwriterIds: string[];
  genres: string[];
  durasi: number;
}

const TambahLagu = ({ params }: { params: { idAlbum: string } }) => {
  const { email, role, name } = useAuth();
  const isArtist = role.includes('artist');
  const isSongwriter = role.includes('songwriter');
  const [songwriters, setSongwriters] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [album, setAlbum] = useState<Album>({ id: '', title: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!params.idAlbum) return;

      const [songwritersData, genresData, albumData, artistData] = await Promise.all([
        fetchSongwriters(),
        fetchGenres(),
        fetchAlbumById(params.idAlbum),
        fetchArtists(),
      ]);

      setSongwriters(songwritersData);
      setGenres(genresData);
      setAlbum(albumData);
      setArtists(artistData);
      setLoading(false);
    };

    fetchData();
  }, [params.idAlbum]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const genreOptions = genres.map((genre) => ({ value: genre.genre, label: genre.genre }));
  const songwriterOptions = songwriters.map((songwriter) => ({ value: songwriter.id, label: songwriter.name }));
  const artistOptions = artists.map((artist) => ({ value: artist.id, label: artist.name }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.target as HTMLFormElement);
    const judul = formData.get('judul') as string;
    const artistEmail = isArtist ? email : (formData.get('artists') as string);
    const songwriterEmails = isSongwriter ? [email] : (formData.getAll('songwriters') as string[]);
    const genres = formData.getAll('genre') as string[];
    const durasi = parseInt(formData.get('durasi') as string, 10);

    if (isArtist) {
      const artistId = await getArtist(artistEmail);
      const songwriterIds = formData.getAll('songwriters') as string[];
      const response = await createSong({
        albumId: params.idAlbum, judul, artistId, songwriterIds, genres, durasi,
      });
      if (response.success) {
        form.reset();
      } else {
        setError(response.error || 'An unexpected error occurred');
      }
    } else if (isSongwriter) {
      const songwriterIds = await getSongwriter(songwriterEmails);
      const artistId = formData.get('artists') as string;
      const response = await createSong({
        albumId: params.idAlbum,
        judul,
        artistId,
        songwriterIds,
        genres,
        durasi,
      });
      if (response.success) {
        form.reset();
      } else {
        setError(response.error || 'An unexpected error occurred');
      }
    }
  };

  return (
    <div className="bg-[#DDA15E] min-h-screen flex flex-col items-center justify-start pt-20 pb-10">
      <div className="create-song-container w-full max-w-md shadow-lg p-4 mb-8 bg-white rounded-lg" style={{ borderColor: '#DDA15E', backgroundColor: '#FEFAE0' }}>
        <h2 className="text-center font-bold text-lg mb-4" style={{ color: '#283618' }}>TAMBAH LAGU</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="col-span-2 flex items-center">
            <label htmlFor="judul" className="mr-4 w-1/4" style={{ color: '#606C38' }}>Judul Lagu:</label>
            <input type="text" id="judul" name="judul" placeholder="Judul Lagu" className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }} />
          </div>
          {isArtist ? (
            <div className="col-span-2 flex items-center">
              <label htmlFor="artists" className="mr-4 w-1/4" style={{ color: '#606C38' }}>Artist:</label>
              <input type="text" id="artist" name="artist" value={name} readOnly className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }} />
            </div>
          ) : (
            <div className="col-span-2 flex items-center">
              <label htmlFor="artists" className="mr-4 w-1/4" style={{ color: '#606C38' }}>Artist:</label>
              <Select
                name="artists"
                instanceId="artists"
                options={artistOptions}
                className="flex-grow p-2 rounded border"
                classNamePrefix="select"
                placeholder="Pilih Artist"
              />
            </div>
          )}
          {isSongwriter ? (
            <div className="col-span-2 flex items-center">
              <label htmlFor="songwriters" className="mr-4 w-1/4" style={{ color: '#606C38' }}>Songwriter:</label>
              <input type="text" id="songwriter" name="songwriter" value={name} readOnly className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }} />
            </div>
          ) : (
            <div className="col-span-2 flex items-center">
              <label htmlFor="songwriters" className="mr-4 w-1/4" style={{ color: '#283618' }}>Songwriter:</label>
              <Select
                name="songwriters"
                instanceId="songwriters"
                isMulti
                options={songwriterOptions}
                className="flex-grow p-2 rounded border"
                classNamePrefix="select"
                placeholder="Pilih Songwriter"
              />
            </div>
          )}
          <div className="col-span-2 flex items-center">
            <label htmlFor="genre" className="mr-4 w-1/4" style={{ color: '#283618' }}>Genre:</label>
            <Select
              name="genre"
              instanceId="genre"
              isMulti
              options={genreOptions}
              className="flex-grow p-2 rounded border"
              classNamePrefix="select"
              placeholder="Pilih Genre"
            />
          </div>
          <div className="col-span-2 flex items-center">
            <label htmlFor="durasi" className="mr-4 w-1/4" style={{ color: '#606C38' }}>Durasi:</label>
            <input type="text" id="durasi" name="durasi" placeholder="Durasi Lagu" className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }} />
          </div>
          <div className="col-span-2">
            <button className="bg-[#283618] text-[#FEFAE0] py-2 px-6 rounded hover:bg-[#DDA15E] w-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahLagu;