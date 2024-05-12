"use server"

import { sql } from "@vercel/postgres";

export async function registerUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const nama = formData.get("nama") as string;
    const gender = formData.get("gender") as string;
    const tempatLahir = formData.get("tempat-lahir") as string;
    const tanggalLahir = formData.get("tanggal-lahir") as string;
    const kotaAsal = formData.get("kota-asal") as string;

    const podcasterFlag = formData.get("podcaster-flag") == '1' ? true : false;
    const artistFlag = formData.get("artist-flag") == '1' ? true : false;
    const songWriterFlag = formData.get("songwriter-flag") == '1' ? true : false;

    if (artistFlag || songWriterFlag || podcasterFlag){
      await sql`
      INSERT INTO AKUN (email, password, nama, gender, tempat_lahir, tanggal_lahir, is_verified, kota_asal)
      VALUES (${email}, ${password}, ${nama}, ${gender}, ${tempatLahir}, ${tanggalLahir}, true, ${kotaAsal})
    `;
    } else {
      await sql`
      INSERT INTO AKUN (email, password, nama, gender, tempat_lahir, tanggal_lahir, is_verified, kota_asal)
      VALUES (${email}, ${password}, ${nama}, ${gender}, ${tempatLahir}, ${tanggalLahir}, false, ${kotaAsal})
    `;
    }

    if (podcasterFlag) {
      await sql`
        INSERT INTO PODCASTER (email)
        VALUES (${email})
      `;
    }

    if (artistFlag || songWriterFlag) {
      const { rows } = await sql`
        INSERT INTO PEMILIK_HAK_CIPTA (id, rate_royalti)
        VALUES (gen_random_uuid(), 0)
        RETURNING id
      `;

      if (artistFlag){
        await sql`
        INSERT INTO ARTIST (id, email_akun, id_pemilik_hak_cipta)
        VALUES (gen_random_uuid(), ${email}, ${rows[0].id})
      `;
      }

      if (songWriterFlag) {
        await sql`
          INSERT INTO SONGWRITER (id, email_akun, id_pemilik_hak_cipta)
          VALUES (gen_random_uuid(), ${email}, ${rows[0].id})
        `;
      }
    }

  } catch (error: any) {
    console.error("Failed to register user:", error);
  }
}
