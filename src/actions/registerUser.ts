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
  
    await sql`
      INSERT INTO AKUN (email, password, nama, gender, tempat_lahir, tanggal_lahir, is_verified, kota_asal)
      VALUES (${email}, ${password}, ${nama}, ${gender}, ${tempatLahir}, ${tanggalLahir}, false, ${kotaAsal})
    `;

  } catch (error: any) {
    console.error("Failed to register user:", error.message || error);
  }
}
