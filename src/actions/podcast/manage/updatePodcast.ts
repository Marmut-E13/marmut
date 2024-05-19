"use server"

import { sql } from "@vercel/postgres";

export const updatePodcast = async (formData: FormData, email: string, idPodcast: string) => {
    try{
        const judul = formData.get("judul") as string;

        const funnyFlag = formData.get("funny-flag") == '1' ? true : false;
        const familyFlag = formData.get("family-flag") == '1' ? true : false;
        const romanceFlag = formData.get("romance-flag") == '1' ? true : false;
        const politicsFlag = formData.get("politics-flag") == '1' ? true : false;
        const educationFlag = formData.get("education-flag") == '1' ? true : false;
        
        console.log(judul, email);


        await sql`
            UPDATE KONTEN
            SET judul = ${judul}
            WHERE id = ${idPodcast}
        `;

        // delete all previous genre
        await sql`
          DELETE FROM GENRE WHERE id_konten = ${idPodcast}
        `;


        if (funnyFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${idPodcast}, 'FUNNY')
            `;
        }

        if (romanceFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${idPodcast}, 'ROMANCE')
            `;
        }

        if (familyFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${idPodcast}, 'FAMILY')
            `;
        }

        if (politicsFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${idPodcast}, 'POLITICS')
            `;
        }

        if (educationFlag) {
            await sql`
              INSERT INTO GENRE (id_konten, genre)
              VALUES (${idPodcast}, 'EDUCATION')
            `;
        }

    } catch (error) {
        console.log("error update podcast: ", error)
    }
}