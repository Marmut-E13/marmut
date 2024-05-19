"use client"

import React, { useEffect, useState, FormEvent } from 'react';
import { useAuth } from "@/contexts";
import { fetchAlbums, fetchLabels, fetchGenres, fetchSongwriters, fetchArtists, createAlbumAndSong, deleteAlbum, getArtist, getSongwriter} from '@/actions/albums/albumAndSongs/getAlbum';
import Select, { components } from 'react-select';

const AlbumAndSongs = () => {
  const { email, name, role } = useAuth();
  const isLabel = role.includes('label');
  const isArtist = role.includes('artist');
  const isSongwriter = role.includes('songwriter');
  const [albums, setAlbums] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [songwriters, setSongwriters] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;
      setLoading(true);
      try {
        const [albumResponse, labelResponse, genreResponse, songwriterResponse, artistResponse] = await Promise.all([
          fetchAlbums(email),
          fetchLabels(),
          fetchGenres(),
          fetchSongwriters(),
          fetchArtists()
        ]);

        if ('error' in albumResponse) {
          const errorMessage = typeof albumResponse.error === 'string' ? albumResponse.error : 'An unexpected error occurred';
          throw new Error(errorMessage);
        }

        setAlbums(albumResponse);
        setLabels(labelResponse);
        setGenres(genreResponse);
        setSongwriters(songwriterResponse);
        setArtists(artistResponse);
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
  }, [email]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const genreOptions = genres.map((genre) => ({ value: genre.genre, label: genre.genre }));
  const songwriterOptions = songwriters.map((songwriter) => ({ value: songwriter.id, label: songwriter.name }));
  const artistOptions = artists.map((artist) => ({ value: artist.id, label: artist.name }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.target as HTMLFormElement);
    const albumTitle = formData.get('albumTitle') as string;
    const labelId = formData.get('label') as string;
    const songTitle = formData.get('songTitle') as string;
    const artistEmail = isArtist ? email : (formData.get('artists') as string);
    const songwriterEmails = isSongwriter ? [email] : (formData.getAll('songwriters') as string[]);
    
    const genres = formData.getAll('genre') as string[];
    console.log(genres);
    const duration = parseInt(formData.get('duration') as string, 10);

    if (isArtist){
      const artistId = await getArtist(artistEmail);
      const songwriterIds = formData.getAll('songwriters') as string[];
      console.log(songwriterIds);
      console.log(artistId);
      const response = await createAlbumAndSong({
        albumTitle, labelId, songTitle, artistId, songwriterIds, genres, duration
      });
      console.log(songwriterIds);
      console.log(artistId);
      if (response.success) {
        form.reset();
        refreshAlbums();
      } else {
        setError(response.error || 'An unexpected error occurred');
      }
    } else if (isSongwriter){
      const songwriterIds = await getSongwriter(songwriterEmails);
      const artistId = formData.get('artists') as string;
      const response = await createAlbumAndSong({
        albumTitle, labelId, songTitle, artistId, songwriterIds, genres, duration
      });
      console.log(songwriterIds);
      console.log(artistId);
      if (response.success) {
        form.reset();
        refreshAlbums();
      } else {
        setError(response.error || 'An unexpected error occurred');
      }
    }
  };

  const refreshAlbums = async () => {
    const updatedAlbums = await fetchAlbums(email);
    if (!('error' in updatedAlbums)) {
      setAlbums(updatedAlbums);
    } else {
      setError(typeof updatedAlbums.error === 'string' ? updatedAlbums.error : 'Failed to fetch updated albums');
    }
  };
  
  const handleDeleteAlbum = async (albumId: string) => {
    const response = await deleteAlbum(albumId);
    if (response.success) {
      refreshAlbums();
    } else {
      setError(typeof response.error === 'string' ? response.error : 'Failed to delete album');
    }
  }

  return (
    <div className="bg-[#DDA15E] min-h-screen flex flex-col items-center justify-start pt-20 pb-10">
      {!isLabel && (
        <div className="create-album-container w-full max-w-md shadow-lg p-4 mb-8 bg-white rounded-lg" style={{ borderColor: '#DDA15E', backgroundColor: '#FEFAE0' }}>
          <h2 className="text-center font-bold text-lg mb-4" style={{ color: '#283618' }}>CREATE ALBUM</h2>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="col-span-2 flex items-center">
              <label htmlFor="albumTitle" className="mr-4 w-1/4" style={{ color: '#606C38' }}>Judul Album:</label>
              <input type="text" id="albumTitle" name="albumTitle" placeholder="Judul Album" className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }} />
            </div>
            <div className="col-span-2 flex items-center">
              <label htmlFor="label" className="mr-4 w-1/4" style={{ color: '#606C38' }}>Label:</label>
              <select id="label" name="label" className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }}>
                {labels.map((label) => (
                  <option key={label.id} value={label.id}>{label.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <h3 className="text-center font-bold text-md mb-2" style={{ color: '#283618', padding: '4px 0' }}>LAGU PERTAMA</h3>
            </div>
            <div className="col-span-2 flex items-center">
              <label htmlFor="songTitle" className="mr-4 w-1/4" style={{ color: '#606C38' }}>Judul Lagu:</label>
              <input type="text" id="songTitle" name="songTitle" placeholder="Judul Lagu" className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }} />
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
                <Select
                  name="songwriters"
                  instanceId="songwriters"
                  isMulti
                  options={songwriterOptions}
                  className="flex-grow p-2 rounded border"
                  classNamePrefix="select"
                  placeholder="Pilih Songwriter"
                  defaultValue={[{ value: songwriters[0].id, label: name }]}
                  isOptionDisabled={(option) => option.value === songwriters[0].id}
                  components={{
                    MultiValueRemove: (props) => {
                      if (props.data.value === songwriters[0].id) {
                        return null;
                      }
                      return <components.MultiValueRemove {...props} />;
                    }
                  }}
                />
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
              <label htmlFor="duration" className="mr-4 w-1/4" style={{ color: '#606C38' }}>Durasi:</label>
              <input type="text" id="duration" name="duration" placeholder="Durasi Lagu" className="flex-grow p-2 rounded border" style={{ backgroundColor: '#FEFAE0' }} />
            </div>
            <div className="col-span-2">
              <button className="bg-[#283618] text-[#FEFAE0] py-2 px-6 rounded hover:bg-[#DDA15E] w-full">Submit</button>
            </div>
          </form>
        </div>
      )}
      <div className="list-album-container w-full max-w-4xl shadow-lg p-4 bg-white rounded-lg mb-10" style={{ borderColor: '#DDA15E', backgroundColor: '#FEFAE0' }}>
        <h2 className="text-center font-bold text-lg mb-4" style={{ color: '#283618' }}>LIST ALBUM</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#DDA15E]">
              <th className="border border-gray-300 p-2 font-semibold text-center">Judul</th>
              <th className="border border-gray-300 p-2 font-semibold text-center">Label</th>
              <th className="border border-gray-300 p-2 font-semibold text-center">Jumlah Lagu</th>
              <th className="border border-gray-300 p-2 font-semibold text-center">Total Durasi</th>
              <th className="border border-gray-300 p-2 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album, index) => (
              <tr key={index} className="hover:bg-[#FEFAE0]">
                <td className="border border-gray-300 p-2 text-center">{album.title}</td>
                <td className="border border-gray-300 p-2 text-center">{album.label}</td>
                <td className="border border-gray-300 p-2 text-center">{album.numsongs}</td>
                <td className="border border-gray-300 p-2 text-center">{album.totalduration}</td>
                <td className="border border-gray-300 p-2 flex flex-col items-center space-y-2">
                  <a href={`/album-and-songs/lihatLagu/${album.id}`} className="bg-[#283618] text-[#FEFAE0] py-1 px-2 rounded hover:bg-[#DDA15E] w-full text-center">Lihat Daftar Lagu</a>
                  {!isLabel && (
                    <a href={`/album-and-songs/tambahLagu/${album.id}`} className="bg-[#283618] text-[#FEFAE0] py-1 px-2 rounded hover:bg-[#DDA15E] w-full text-center">Tambah Lagu</a>
                  )}
                  <button
                    onClick={() => handleDeleteAlbum(album.id)}
                    className="bg-[#283618] text-[#FEFAE0] py-1 px-2 rounded hover:bg-[#DDA15E] w-full">Hapus</button>
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