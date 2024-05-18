import  LabelDashboard from "@/components/dashboard/labelDashboard";
import { PodcasterDashboard } from "@/components/dashboard/podcasterDashboard";
import { UserDashboard } from "@/components/dashboard/userDashboard";

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-5">
             <div className="flex flex-col w-full items-start gap-3">
                <div>
                    <div className="flex flex-row gap-[10px]">
                        <text className="font-semibold">Nama:</text>
                        <text>Lana del Rey</text>
                    </div>

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Email:</text>
                        {/* <text>{dummyData.total_durasi}</text> */}
                        <text>lana@gmail.com</text>
                    </div>

                    {/* <div className="flex flex-row gap-2">
                        <text className="font-semibold">Kontak:</text>
                        <text>08987654321</text>
                    </div> */}

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Kota asal:</text>
                        <text>Depok</text>
                    </div>

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Gender:</text>
                        <text>Perempuan</text>
                    </div>

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Tempat Lahir:</text>
                        <text>Depok</text>
                    </div>

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Tanggal Lahir:</text>
                        <text>20/04/2004</text>
                    </div>

                    <div className="flex flex-row gap-2">
                        <text className="font-semibold">Role:</text>
                        <text>Artist, Podcaster</text>
                    </div>
                </div>
            </div>

            <LabelDashboard />
        </div>
    )
}

export default Dashboard;