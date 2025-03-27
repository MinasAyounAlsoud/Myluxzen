import React, { useState, useMemo } from 'react';

export function QueryResults({ results, hasMore, onLoadMore, fetchBooking }) {
    const [sortKey, setSortKey] = useState('createdDate'); // 默认排序方式
    const [sortOrder, setSortOrder] = useState("asc");
    const sortedResults = useMemo(() => {
        return results.slice().sort((a, b) => {
            if (sortKey === 'guestFamilyName' && sortOrder === "asc") {
                return a.guestFamilyName.localeCompare(b.guestFamilyName);
            } else if (sortKey === 'guestFamilyName' && sortOrder === "dasc"){
                return b.guestFamilyName.localeCompare(a.guestFamilyName);
            } else if (sortKey === 'startDate' && sortOrder === "asc") {
                return new Date(a.startDate) - new Date(b.startDate);
            } else if (sortKey === 'startDate' && sortOrder === "dasc") {
                return new Date(b.startDate) - new Date(a.startDate) ;    
            } else if (sortKey === 'createdDate'&& sortOrder === "asc") {
                return new Date(a.createdDate) - new Date(b.createdDate);
            }
            else if (sortKey === 'createdDate' && sortOrder === "dasc") {
                return new Date(b.createdDate) - new Date(a.createdDate) ;
            }
            return 0;
        });
    }, [results, sortKey, sortOrder]);

    return (
        <div className='lg:w-3/5 mx-auto my-10 px-10  '>
            <div className='mb-4'>
                <p>Anzahl der Suchergebnisse: {results.length}</p>
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex mb-4  space-x-4'>
                        <label htmlFor="sort">Sortierung:</label>
                        <select id="sort" value={sortKey} onChange={e => setSortKey(e.target.value)} className="rounded bg-white border border-gray-300">
                            <option value="createdDate">Erstellungsdatum der Bestellung</option>
                            <option value="guestFamilyName">Nachname des Kunden</option>
                            <option value="startDate">Startdatum der Bestellung</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0 px-2 rounded inline-flex items-center text-2xl"
                        >
                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    </button>
                </div>
            </div>
            {results.length === 0 ? (
                <p>Keine Buchungtickets</p>
            ) : (
                <ul className='flex flex-col space-y-2 px-10'>
                    {sortedResults.map((result, index) => (
                        <li key={index} className='border border-gray-300 py-1 px-1 rounded-md cursor-pointer px-6'
                        onClick={()=>fetchBooking(result.bookingNumber)}>
                            <p>BuchungNum: {result.bookingNumber}</p>
                            <div className='flex justify-between'>
                                <p>Email: {result.email}</p>
                                <p>Gast Name: {result.guestFirstName} {result.guestFamilyName}</p>
                            </div>
                            <p>Status: {result.status}</p>
                            <div className='flex justify-between'>
                                <p>Haus Type: {result.houseType}</p>
                                <p>Haus Nummer: {result.houseNum}</p>
                            </div>
                            <p>Datum: {result.startDate.slice(0,10)} to {result.endDate.slice(0,10)}</p>
                        </li>
                    ))}
                </ul>
            )}
            {hasMore && (
                <button onClick={onLoadMore} className='bg-gray-800 text-white px-4 mt-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>
                    Weiterleitung
                </button>
            )}
        </div>
    );
}

