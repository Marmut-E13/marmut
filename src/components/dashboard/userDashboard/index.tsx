import userImgPNG from '@/images/userimg.png'
import Image from "next/image";
import { useEffect, useState } from 'react';
import Head from 'next/head';

interface UserDetails {
    username: string;
    email: string;
    city: string;
    gender: string;
    bornPlace: string;
    bornDate: string;
    userRoles: string[];
}
  
interface Playlist {
    id: string;
    name: string;
    songs: string[];
}

export const UserDashboard: React.FC = () => {
    const userDetails: UserDetails = {
        username: 'Marmoet',
        email: 'marmoete@example.com',
        city: 'Jakarta',
        gender: 'Male',
        bornPlace: 'Depok',
        bornDate: '2004-02-28',
        userRoles: ['Pengguna Biasa'],
    };
    
    const userPlaylist: Playlist[] = [
        { id: '1', name: 'Playlist 1', songs: ['Song 1', 'Song 2', 'Song 3'] },
        { id: '2', name: 'Playlist 2', songs: ['Song 4', 'Song 5', 'Song 6'] },
    ];

    return (
        <div className="py-[60px]">
            <div className="container mt-5">
                <Head>
                    <title>Music Player Dashboard</title>
                </Head>
                <h1>Welcome to Your Music Player Dashboard</h1>
                {userDetails && (
                    <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">User Details</h5>
                        <p><strong>Username:</strong> {userDetails.username}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                        <p><strong>City:</strong> {userDetails.city}</p>
                        <p><strong>Gender:</strong> {userDetails.gender}</p>
                        <p><strong>Born Place:</strong> {userDetails.bornPlace}</p>
                        <p><strong>Born Date:</strong> {userDetails.bornDate}</p>
                        <p><strong>User Roles:</strong> {userDetails.userRoles.join(', ')}</p>
                    </div>
                    </div>
                )}
                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">User Playlist</h5>
                        {userPlaylist.length > 0 ? (
                            <ul className="list-group">
                            {userPlaylist.map(playlist => (
                                <li key={playlist.id} className="list-group-item">{playlist.name}</li>
                            ))}
                            </ul>
                        ) : 
                        (
                            <p className="text-muted mt-3">You haven't created any playlist yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard