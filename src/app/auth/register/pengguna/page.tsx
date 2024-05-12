"use client"

import { usePathname, useRouter } from "next/navigation";
import { FormEvent } from "react";
import { registerUser } from "@/actions/registerUser";

const Pengguna: React.FC = () => {
    const router = useRouter();

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            await registerUser(formData);
            router.push(`auth/login`)

          } catch (error) {
            console.error("Failed to register user:", error);
          }
    }

    return (
        <div className="px-[120px] flex justify-center py-[90px]">
            <form onSubmit={handleRegister} className="min-w-[600px] border-[2px] border-stonks-700 rounded-xl p-[55px] flex flex-col gap-4">

                <div>
                    <label className="form-label">Email</label>
                    <input name="email" type="email" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Password</label>
                    <input name="password" type="password" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Nama</label>
                    <input name="nama" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Gender</label>
                    <div>
                        <div>
                            <input className="form-check-input" type="radio" name="gender" value={1}/>
                            <label className="form-label">Male</label>
                        </div>

                        <div>
                            <input className="form-check-input" type="radio" name="gender" value={0}/>
                            <label className="form-label">Female</label>
                        </div>

                    </div>
                </div>

                <div>
                    <label className="form-label">Tempat lahir</label>
                    <input name="tempat-lahir"className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Tanggal lahir</label>
                    <input name="tanggal-lahir"className="form-control border-stonks-600" type="date"/>
                </div>

                <div>
                    <label className="form-label">Kota asal</label>
                    <input name="kota-asal" className="form-control border-stonks-600" />
                </div>

                <div>
                    <label className="form-label">Role (optional)</label>

                    <div className="flex fliex-row justify-between">
                        <div className="flex gap-2">
                            <input className="form-check-input border-stonks-500" name="podcaster-flag" type="checkbox" value="1"/>
                            <label>Podcaster</label>
                        </div>

                        <div className="flex gap-2">
                            <input className="form-check-input border-stonks-500" name="artist-flag" type="checkbox" value="1"/>
                            <label>Artist</label>
                        </div>

                        <div className="flex gap-2">
                            <input className="form-check-input border-stonks-500" name="songwriter-flag" type="checkbox" value="1"/>
                            <label>Songwriter</label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="bg">Register</button>
            </form>
        </div>
    )
}

export default Pengguna;