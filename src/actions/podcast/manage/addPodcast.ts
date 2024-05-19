"use server"

import { sql } from "@vercel/postgres";

export const addPodcast = async (formData: FormData, email: string) => {
    try{
        const judul = formData.get("judul") as string;

        const funnyFlag = formData.get("funny-flag") == '1' ? true : false;
        const familyFlag = formData.get("family-flag") == '1' ? true : false;
        const romanceFlag = formData.get("romance-flag") == '1' ? true : false;
        const politicsFlag = formData.get("politics-flag") == '1' ? true : false;
        const educationFlag = formData.get("education-flag") == '1' ? true : false;
        
        console.log(judul, email);

        const newKonten = await sql`
            INSERT INTO KONTEN (id, judul, durasi)
            VALUES (gen_random_uuid(), ${judul}, 0)
            RETURNING id
        `;


        await sql`
            INSERT INTO PODCAST (id_konten, email_podcaster)
            VALUES (${newKonten.rows[0].id}, ${email})
        `;


        if (funnyFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${newKonten.rows[0].id}, 'FUNNY')
            `;
        }

        if (romanceFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${newKonten.rows[0].id}, 'ROMANCE')
            `;
        }

        if (familyFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${newKonten.rows[0].id}, 'FAMILY')
            `;
        }

        if (politicsFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${newKonten.rows[0].id}, 'POLITICS')
            `;
        }

        if (educationFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${newKonten.rows[0].id}, 'EDUCATION')
            `;
        }

    } catch (error) {
        console.log("error add podcast: ", error)
    }
}