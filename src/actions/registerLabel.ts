"use server"

import { sql } from "@vercel/postgres";

export async function registerLabel(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const nama = formData.get("nama") as string;
    const kontak = formData.get("kontak") as string;

    const { rows } = await sql`
        INSERT INTO PEMILIK_HAK_CIPTA (id, rate_royalti)
        VALUES (gen_random_uuid(), 0)
        RETURNING id
      `;

    await sql`
      INSERT INTO LABEL (id, id_pemilik_hak_cipta, email, password, nama, kontak)
      VALUES (gen_random_uuid(), ${rows[0].id}, ${email}, ${password}, ${nama}, ${kontak})
    `;

  } catch (error: any) {
    console.error("Failed to register label:", error.message || error);
  }
}
