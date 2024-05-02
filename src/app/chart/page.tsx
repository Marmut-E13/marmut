"use client"

import Head from 'next/head';
import Link from 'next/link';

interface Chart {
    id: string;
    type: string;
    // Add more properties as needed
}

const Chart: React.FC = () => {
    const charts: Chart[] = [
        {
          id: 'caaa6fd4-404c-422f-8137-3a89d6b08807',
          type: 'top 20 weekly',
        },
        {
          id: 'f277d6ba-5b25-4f19-91c6-cb3f7633cf39',
          type: 'top 20 daily',
        },
    ];
    
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
                    {charts.map((chart) => (
                        <tr key={chart.id}>
                        <td>
                            <p>{chart.type}</p>
                        </td>
                        <td>
                            <Link href={`/chart/${chart.id}`}>
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