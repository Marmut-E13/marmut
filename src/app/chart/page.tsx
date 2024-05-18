"use client"

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { getAllChart } from "@/actions/chart/getAllChart";


interface ChartProps {
    tipe: string;
    id_playlist: string;
    // Add more properties as needed
}

const Chart: React.FC = () => {

    const [chartList, setChartList] = useState<ChartProps[]>([]);
    
    const handleGetChartList = async () => {
        try {
            const res = await getAllChart();

            setChartList(res as ChartProps[]);

        } catch (error) {

        }
    };
    
    useEffect(() => {
        handleGetChartList();
    }, []);


    return (
        <div className="py-5">
            <div className="container mt-5">
                <Head>
                    <title>Chart List</title>
                </Head>
                <h1 className='my-2 font-bold text-xl'>Chart List</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Chart Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {chartList.map((chart) => (
                        <tr key={chart.id_playlist}>
                        <td>
                            <p>{chart.tipe}</p>
                        </td>
                        <td>
                            <Link href={`/chart/${chart.id_playlist}`}>
                                <p className='text-primary'><u>details</u></p>
                            </Link>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Chart;