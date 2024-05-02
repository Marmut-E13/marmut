export interface UserPlaylistProps {
    email_pembuat: string;
    id_user_playlist: string;
    judul: string;
    deskripsi: string;
    jumlah_lagu: number;
    tanggal_dibuat: Date;
    id_playlist: string;
    total_durasi: number;
}

export interface SongProps {
    id_konten: string;
    id_artist: string;
    id_album: string;
    total_play: number;
    total_download: number;
}
  
export interface KontenProps {
    id: string;
    judul: string;
    tanggal_rilis: Date;
    tahun: number;
    durasi: number;
  }