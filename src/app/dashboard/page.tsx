import { LabelDashboard } from "@/components/dashboard/labelDashboard";
import { PodcasterDashboard } from "@/components/dashboard/podcasterDashboard";
import { UserDashboard } from "@/components/dashboard/userDashboard";

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-5">
            <UserDashboard />
        </div>
    )
}

export default Dashboard;