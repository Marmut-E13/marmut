"use client"

import React, { useEffect, useState } from "react";
import { getDashboardInfo, DashboardInfo } from "@/actions/getDashboardInfo";
import { UserDashboard } from "@/components/dashboard/userDashboard";
import { SongwriterDashboard } from "@/components/dashboard/songwriterDashboard";
import { ArtistDashboard } from "@/components/dashboard/artistDashboard";
import { useAuth } from "@/contexts";
import PodcasterDashboard from "@/components/dashboard/podcasterDashboard";
import LabelDashboard from "@/components/dashboard/labelDashboard";

const Dashboard: React.FC = () => {
    const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo | null>(null);
    const { email, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchDashboardInfo = async () => {
            try {
                if (isAuthenticated && email) {
                    const info = await getDashboardInfo(email);
                    setDashboardInfo(info);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard info:", error);
            }
        };

        if (isAuthenticated) {
            fetchDashboardInfo();
        }
    }, [isAuthenticated, email]);

    if (!dashboardInfo) {
        return <div>Loading...</div>;
    }

    const roles = dashboardInfo.roles;
    const isUser = roles.includes("pengguna");
    const isArtist = roles.includes("artist");
    const isPodcaster = roles.includes("podcaster");
    const isSongwriter = roles.includes("songwriter");
    const isLabel = roles.includes("label");

    return (
        <div className="flex flex-col h-screen w-screen py-[120px] px-[120px] items-center gap-5">
            <div className="flex flex-col w-full items-start gap-3">
                <div>
                    <div className="flex flex-row gap-[10px]">
                        <span className="font-semibold">Nama:</span>
                        <span>{dashboardInfo.nama}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <span className="font-semibold">Email:</span>
                        <span>{dashboardInfo.email}</span>
                    </div>
                    {isLabel && dashboardInfo.kontak && (
                        <div className="flex flex-row gap-2">
                            <span className="font-semibold">Kontak:</span>
                            <span>{dashboardInfo.kontak}</span>
                        </div>
                    )}
                    {!isLabel && (
                        <>
                            <div className="flex flex-row gap-2">
                                <span className="font-semibold">Kota asal:</span>
                                <span>{dashboardInfo.kota_asal}</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span className="font-semibold">Gender:</span>
                                <span>{dashboardInfo.gender}</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span className="font-semibold">Tempat Lahir:</span>
                                <span>{dashboardInfo.tempat_lahir}</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span className="font-semibold">Tanggal Lahir:</span>
                                <span>{new Date(dashboardInfo.tanggal_lahir ?? '').toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span className="font-semibold">Role:</span>
                                <span>{roles.join(", ")}</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span className="font-semibold">Status Langganan:</span>
                                <span>{dashboardInfo.status_langganan}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Display role-specific dashboards */}
            {isPodcaster && <PodcasterDashboard />}
            {isLabel && <LabelDashboard />}
            {isSongwriter && <SongwriterDashboard />}
            {isArtist && <ArtistDashboard />}
            {isUser && !isPodcaster && !isLabel && !isSongwriter && !isArtist && <UserDashboard />}
        </div>
    );
};

export default Dashboard;
