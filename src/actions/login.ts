"use server"

import { sql } from "@vercel/postgres";


export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const count = await sql`
      SELECT COUNT(*) FROM AKUN
      WHERE email=${email} AND password=${password}
    `;

    return count as any == 0 ? false : true;

  } catch (error: any) {
    console.error("Failed to register user:", error.message || error);
  }
}
