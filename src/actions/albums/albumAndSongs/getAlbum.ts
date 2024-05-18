"use server"

import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export const fetchAlbums = async (email: string) => {
  try {
    const query = `
      SELECT
        a.id,
        a.judul AS title,
        COUNT(s.id_konten) AS numSongs,
        SUM(k.durasi) AS totalDuration,
        l.nama AS label
      FROM album a
      LEFT JOIN song s ON a.id = s.id_album
      LEFT JOIN konten k ON s.id_konten = k.id
      LEFT JOIN label l ON a.id_label = l.id
      LEFT JOIN artist ar ON s.id_artist = ar.id
      LEFT JOIN songwriter_write_song sws ON s.id_konten = sws.id_song
      LEFT JOIN songwriter sw ON sws.id_songwriter = sw.id
      LEFT JOIN akun ak ON ar.email_akun = ak.email OR sw.email_akun = ak.email
      WHERE ak.email = $1
      GROUP BY a.id, l.nama
      UNION
      SELECT
        a.id,
        a.judul AS title,
        COUNT(s.id_konten) AS numSongs,
        SUM(k.durasi) AS totalDuration,
        l.nama AS label
      FROM album a
      LEFT JOIN song s ON a.id = s.id_album
      LEFT JOIN konten k ON s.id_konten = k.id
      LEFT JOIN label l ON a.id_label = l.id
      WHERE l.email = $1
      GROUP BY a.id, l.nama;
    `;
    const { rows } = await sql.query(query, [email]);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    throw error;
  }
}

export const fetchAlbumById = async (idAlbum: string) => {
  try {
    const query = `
      SELECT 
          a.id, 
          a.judul AS title, 
          COUNT(s.id_konten) AS numSongs, 
          SUM(k.durasi) AS totalDuration,
          l.nama AS label
      FROM album a
      LEFT JOIN song s ON a.id = s.id_album
      LEFT JOIN konten k ON s.id_konten = k.id
      LEFT JOIN label l ON a.id_label = l.id
      WHERE a.id = $1
      GROUP BY a.id, l.nama;
    `;
    const { rows } = await sql.query(query, [idAlbum]);
    if (rows.length === 0) {
      console.log(`No album found for album ID: ${idAlbum}`);
      return { error: 'No album found for the provided ID.' };
    }
    return rows[0];
  } catch (error) {
    console.error("Failed to fetch album by ID:", error);
    throw error;
  }
}

export const fetchLabels = async () => {
  try {
    const query = `
      SELECT id, nama AS name
      FROM label;
    `;
    const { rows } = await sql.query(query);
    return rows;
  } catch (error) {
    console.error("Failed to fetch labels:", error);
    throw error;
  }
}

export const fetchGenres = async () => {
  try {
    const query = `
      SELECT DISTINCT genre
      FROM genre;
    `;
    const { rows } = await sql.query(query);
    return rows;
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    throw error;
  }
}

export const fetchSongwriters = async () => {
  try {
    const query = `
      SELECT id, nama AS name
      FROM songwriter
      JOIN akun ON songwriter.email_akun = akun.email;
    `;
    const { rows } = await sql.query(query);
    return rows;
  } catch (error) {
    console.error("Failed to fetch songwriters:", error);
    throw error;
  }
}

export const fetchArtists = async () => {
  try {
    const query = `
      SELECT id, nama AS name
      FROM artist
      JOIN akun ON artist.email_akun = akun.email;
    `;
    const { rows } = await sql.query(query);
    return rows;
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    throw error;
  }
}

export const getArtist = async (email: string) => {
  try {
    const query = `
      SELECT id
      FROM artist
      WHERE email_akun = $1
    `;
    const { rows } = await sql.query(query, [email]);
    if (rows.length === 0) {
      throw new Error('Artist not found');
    }
    return rows[0].id;
  } catch (error) {
    console.error("Failed to fetch artist ID:", error);
    throw error;
  }
};

export const getSongwriter = async (emails: string[]) => {
  try {
    const query = `
      SELECT id
      FROM songwriter
      WHERE email_akun = ANY($1::text[])
    `;
    const { rows } = await sql.query(query, [emails]);
    return rows.map(row => row.id);
  } catch (error) {
    console.error("Failed to fetch songwriter IDs:", error);
    throw error;
  }
};

interface AlbumData {
  albumTitle: string;
  labelId: string;
  songTitle: string;
  artistId: string;
  songwriterIds: string[];
  genres: string[];
  duration: number;
}

export const createAlbumAndSong = async (albumData: AlbumData) => {
  const { albumTitle, labelId, songTitle, artistId, songwriterIds, genres, duration } = albumData;

  const albumId = uuidv4();
  const songId = uuidv4();
  const kontenId = uuidv4();

  try {
    await sql`BEGIN`;

    await sql`
      INSERT INTO album (id, judul, jumlah_lagu, id_label, total_durasi)
      VALUES (${albumId}, ${albumTitle}, 1, ${labelId}, ${duration});
    `;

    await sql`
      INSERT INTO konten (id, judul, tanggal_rilis, tahun, durasi)
      VALUES (${kontenId}, ${songTitle}, CURRENT_DATE, EXTRACT(YEAR FROM CURRENT_DATE), ${duration});
    `;

    await sql`
      INSERT INTO song (id_konten, id_artist, id_album, total_play, total_download)
      VALUES (${kontenId}, ${artistId}, ${albumId}, 0, 0);
    `;

    const genrePromises = genres.map((genre) => {
      return sql`
        INSERT INTO genre (id_konten, genre)
        VALUES (${kontenId}, ${genre});
      `;
    });

    const songwriterPromises = songwriterIds.map((songwriterId) => {
      return sql`
        INSERT INTO songwriter_write_song (id_songwriter, id_song)
        VALUES (${songwriterId}, ${kontenId});
      `;
    });

    await Promise.all([...genrePromises, ...songwriterPromises]);

    await sql`COMMIT`;

    return { success: true };
  } catch (error) {
    await sql`ROLLBACK`;
    console.error("Failed to create album and song:", error);
    return { error: 'Failed to create album and song due to a server error.' };
  }
};

export const deleteAlbum = async (albumId: string) => {
  try {
    await sql`
      DELETE FROM album WHERE id = ${albumId};
    `;
    return { success: true };
  } catch (error) {
    console.error("Failed to delete album:", error);
    return { error: 'Failed to delete album due to a server error.' };
  }
};

export const deleteSong = async (songId: string) => {
  try {
    await sql`
      DELETE FROM song WHERE id_konten = ${songId};
    `;
    await sql`
      DELETE FROM konten WHERE id = ${songId};
    `;
    return { success: true };
  } catch (error) {
    console.error("Failed to delete song:", error);
    return { error: 'Failed to delete song due to a server error.' };
  }
};

export const fetchSongsByAlbum = async (albumId: string) => {
  try {
    const query = `
      SELECT 
          k.id AS id,
          k.judul AS title, 
          k.durasi AS duration, 
          s.total_play AS totalPlay, 
          s.total_download AS totalDownload
      FROM 
          song s
      JOIN 
          konten k ON s.id_konten = k.id
      WHERE 
          s.id_album = $1;
    `;
    const { rows } = await sql.query(query, [albumId]);
    return rows;
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    return { error: 'Failed to fetch songs due to a server error.' };
  }
};

interface SongData {
  albumId: string;
  judul: string;
  artistId: string;
  songwriterIds: string[];
  genres: string[];
  durasi: number;
}

export const createSong = async (songData: SongData) => {
  const { albumId, judul, artistId, songwriterIds, genres, durasi } = songData;

  const kontenId = uuidv4();

  try {

    await sql`START TRANSACTION`;

    await sql`
      INSERT INTO konten (id, judul, tanggal_rilis, tahun, durasi)
      VALUES (${kontenId}, ${judul}, CURRENT_DATE, EXTRACT(YEAR FROM CURRENT_DATE), ${durasi});
    `;

    await sql`
      INSERT INTO song (id_konten, id_artist, id_album, total_play, total_download)
      VALUES (${kontenId}, ${artistId}, ${albumId}, 0, 0);
    `;

    const genrePromises = genres.map((genre) => {
      return sql`
        INSERT INTO genre (id_konten, genre)
        VALUES (${kontenId}, ${genre});
      `;
    });

    const songwriterPromises = songwriterIds.map((songwriterId) => {
      return sql`
        INSERT INTO songwriter_write_song (id_songwriter, id_song)
        VALUES (${songwriterId}, ${kontenId});
      `;
    });

    await Promise.all([...genrePromises, ...songwriterPromises]);

    await sql`COMMIT`;

    return { success: true };
  } catch (error) {

    await sql`ROLLBACK`;
    console.error("Failed to create song:", error);
    return { error: 'Failed to create song due to a server error.' };
  }
};

export const callUpdateAlbumAttributesTrigger = async () => {
  try {
    const query = `
      SELECT update_album_attributes();
    `;
    await sql.query(query);
  } catch (error) {
    console.error("Failed to call update_album_attributes trigger:", error);
    throw error;
  }
};