"use server"

import { sql } from "@vercel/postgres";

export async function registerLabel(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const nama = formData.get("nama") as string;
    const kontak = formData.get("gender") as string;

    await sql`
      INSERT INTO LABEL (email, password, nama, kontak)
      VALUES (${email}, ${password}, ${nama}, ${kontak})
    `;
  } catch (error: any) {
    console.error("Failed to register label:", error.message || error);
  }
}
