import React, { useState, useMemo } from 'react';

export function QueryResults({ results, hasMore, onLoadMore, fetchBooking }) {
    const [sortKey, setSortKey] = useState('createdDate'); // 默认排序方式

    const sortedResults = useMemo(() => {
        return results.slice().sort((a, b) => {
            if (sortKey === 'guestFamilyName') {
                return a.guestFamilyName.localeCompare(b.guestFamilyName);
            } else if (sortKey === 'startDate') {
                return new Date(a.startDate) - new Date(b.startDate);
            } else if (sortKey === 'createdDate') {
                return new Date(a.createdDate) - new Date(b.createdDate);
            }
            return 0;
        });
    }, [results, sortKey]);

    return (
        <div className='lg:w-3/5 mx-auto my-10 px-10'>
            <div className='mb-4'>
                <p>Anzahl der Suchergebnisse: {results.length}</p>
                <div className='flex justify-between items-center mb-4'>
                    <label htmlFor="sort">Sortierung:</label>
                    <select id="sort" value={sortKey} onChange={e => setSortKey(e.target.value)} className="rounded bg-white border border-gray-300">
                        <option value="createdDate">Erstellungsdatum der Bestellung</option>
                        <option value="guestFamilyName">Nachname des Kunden</option>
                        <option value="startDate">Startdatum der Bestellung</option>
                    </select>
                </div>
            </div>
            {results.length === 0 ? (
                <p>No result</p>
            ) : (
                <ul className='flex flex-col space-y-2'>
                    {sortedResults.map((result, index) => (
                        <li key={index} className='border border-gray-300 py-1 px-1 rounded-md'
                        onClick={()=>fetchBooking(result.bookingNumber)}>
                            <p>BuchungNum: {result.bookingNumber}</p>
                            <p>Email: {result.email}</p>
                            <p>Status: {result.status}</p>
                            <p>Gast Name: {result.guestFirstName} {result.guestFamilyName}</p>
                            <p>Date: {result.startDate} to {result.endDate}</p>
                        </li>
                    ))}
                </ul>
            )}
            {hasMore && (
                <button onClick={onLoadMore} className='bg-gray-800 text-white px-4 mt-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>
                    Continue
                </button>
            )}
        </div>
    );
}

