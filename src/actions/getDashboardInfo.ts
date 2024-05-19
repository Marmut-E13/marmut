"use server";

import { sql } from "@vercel/postgres";

export interface DashboardInfo {
    nama: string;
    email: string;
    status_langganan: string;
    kontak: string;
    kota_asal: string;
    gender: string;
    tempat_lahir: string;
    tanggal_lahir: Date;
    roles: ('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'premium' | 'label')[]; // Tambahkan roles sebagai array string
}

export const getDashboardInfo = async (email: string): Promise<DashboardInfo | null> => {
    try {
        const { rows } = await sql`
            SELECT
                AKUN.nama,
                AKUN.email,
                CASE
                    WHEN PREMIUM.email IS NOT NULL THEN 'Premium'
                    ELSE 'Non-Premium'
                END AS status_langganan,
                COALESCE(LABEL.kontak, '') AS kontak,
                COALESCE(AKUN.kota_asal, '') AS kota_asal,
                COALESCE(AKUN.gender::VARCHAR, '') AS gender,
                COALESCE(AKUN.tempat_lahir, '') AS tempat_lahir,
                AKUN.tanggal_lahir
            FROM
                AKUN
            LEFT JOIN PREMIUM ON AKUN.email = PREMIUM.email
            LEFT JOIN LABEL ON AKUN.email = LABEL.email
            WHERE
                AKUN.email = ${email};
        `;

        if (rows.length === 0) {
            return null; // Return null if user not found
        }

        // Ambil roles menggunakan email
        const roles: ('' | 'pengguna' | 'podcaster' | 'songwriter' | 'artist' | 'premium' | 'label')[] = [];

        const [artistRoles, songwriterRoles, podcasterRoles, premiumRoles, labelRoles] = await Promise.all([
            sql`SELECT COUNT(*) FROM ARTIST WHERE email_akun=${email}`,
            sql`SELECT COUNT(*) FROM SONGWRITER WHERE email_akun=${email}`,
            sql`SELECT COUNT(*) FROM PODCASTER WHERE email=${email}`,
            sql`SELECT COUNT(*) FROM PREMIUM WHERE email=${email}`,
            sql`SELECT COUNT(*) FROM LABEL WHERE email=${email}`
        ]);

        if (artistRoles.rows[0].count > 0) {
            roles.push('artist');
        }
        if (songwriterRoles.rows[0].count > 0) {
            roles.push('songwriter');
        }
        if (podcasterRoles.rows[0].count > 0) {
            roles.push('podcaster');
        }
        if (premiumRoles.rows[0].count > 0) {
            roles.push('premium');
        }
        if (labelRoles.rows[0].count > 0) {
            roles.push('label');
        }

        if (roles.length === 0) {
            roles.push('pengguna');
        } else if (!roles.includes('pengguna')) {
            roles.push('pengguna');
        }

        const dashboardInfo: DashboardInfo = {
            nama: rows[0].nama,
            email: rows[0].email,
            status_langganan: rows[0].status_langganan,
            kontak: rows[0].kontak,
            kota_asal: rows[0].kota_asal,
            gender: rows[0].gender,
            tempat_lahir: rows[0].tempat_lahir,
            tanggal_lahir: rows[0].tanggal_lahir,
            roles: roles
        };

        return dashboardInfo;
    } catch (error) {
        console.error("Gagal mengambil informasi dashboard:", error);
        throw error;
    }
};
