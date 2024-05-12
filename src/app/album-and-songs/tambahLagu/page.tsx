"use client"

import React from 'react';
import Select from 'react-select';

const TambahLagu = () => {
  // Placeholder untuk data dummy
  const dummySongwriters = [
    'Songwriter 1', 'Songwriter 2', 'Songwriter 3', 'Songwriter 4', 'Songwriter 5',
    'Songwriter 6', 'Songwriter 7', 'Songwriter 8', 'Songwriter 9', 'Songwriter 10'
  ].map(songwriter => ({ value: songwriter, label: songwriter }));

  const dummyGenres = [
    'Pop', 'Rock', 'Jazz', 'Hip Hop', 'Classical', 'Electronic', 'Country', 'Reggae', 'Metal', 'Blues',
    'Folk', 'R&B', 'Soul', 'Punk', 'Disco', 'Funk', 'House', 'Techno', 'Trance', 'K-Pop', 'J-Pop', 'C-Pop',
    'Latin', 'Gospel', 'Reggaeton', 'Ska', 'Swing', 'Grime', 'Dubstep', 'Drum and Bass', 'Ambient',
    'Soundtrack', 'World', 'Indie', 'Alternative', 'Acoustic', 'Emo', 'Screamo', 'Hardcore', 'Post-Hardcore',
    'Heavy Metal', 'Death Metal', 'Black Metal', 'Thrash Metal', 'Progressive Metal', 'Power Metal',
    'Symphonic Metal', 'Gothic Metal', 'Viking Metal', 'Folk Metal', 'Industrial Metal', 'Glam Metal'
  ].map(genre => ({ value: genre, label: genre }));

  return (
    <div className="bg-[#DDA15E] min-h-screen flex flex-col items-center justify-start pt-20">
      <div className="create-lagu-container w-full max-w-2xl shadow-lg p-4 mb-8 bg-[#DDA15E] rounded-lg" style={{ borderColor: '#DDA15E', backgroundColor: '#FEFAE0', border: '2px solid #283618' }}>
        <h2 className="text-center font-bold text-lg mb-4" style={{ color: '#283618' }}>TAMBAH LAGU</h2>
        <form className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full flex items-center">
            <label htmlFor="album" className="mr-4 w-1/4" style={{ color: '#283618' }}>Album:</label>
            <span className="flex-grow p-2 rounded border w-3/4" style={{ backgroundColor: 'white', borderColor: '#606C38' }}>Parachutes</span>
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="judul" className="mr-4 w-1/4" style={{ color: '#283618' }}>Judul:</label>
            <input type="text" id="judul" name="judul" placeholder="Judul Lagu" className="flex-grow p-2 rounded border w-3/4" style={{ backgroundColor: 'white', borderColor: '#606C38' }} />
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="artist" className="mr-4 w-1/4" style={{ color: '#283618' }}>Artist:</label>
            <span className="flex-grow p-2 rounded border w-3/4" style={{ backgroundColor: 'white', borderColor: '#606C38' }}>Coldplay</span>
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="songwriter" className="mr-4 w-1/4" style={{ color: '#283618' }}>Songwriter:</label>
            <Select
              id="songwriter"
              instanceId="songwriter"
              isMulti
              options={dummySongwriters}
              className="flex-grow p-2 rounded border w-3/4"
              classNamePrefix="select"
              placeholder="Pilih Songwriter"
            />
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="genre" className="mr-4 w-1/4" style={{ color: '#283618' }}>Genre:</label>
            <Select
              id="genre"
              instanceId="genre" 
              isMulti
              options={dummyGenres}
              className="flex-grow p-2 rounded border w-3/4"
              classNamePrefix="select"
              placeholder="Pilih Genre"
            />
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="durasi" className="mr-4 w-1/4" style={{ color: '#283618' }}>Durasi:</label>
            <input type="text" id="durasi" name="durasi" placeholder="Durasi Lagu (Dalam Menit)" className="flex-grow p-2 rounded border w-3/4" style={{ backgroundColor: 'white', borderColor: '#606C38' }} />
          </div>
          <button className="bg-[#283618] text-[#FEFAE0] py-2 px-6 rounded hover:bg-[#BC6C25] w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TambahLagu;