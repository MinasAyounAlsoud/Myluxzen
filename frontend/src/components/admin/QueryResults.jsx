import React, { useState, useMemo, useEffect } from 'react';

export function QueryResults({ results, hasMore, onLoadMore, fetchBooking }) {
    const [sortKey, setSortKey] = useState('createdDate'); // 默认排序方式
    const [sortOrder, setSortOrder] = useState("asc");
    const sortedResults = useMemo(() => {
        return results.slice().sort((a, b) => {
            if (sortKey === 'guestFamilyName' && sortOrder === "asc") {
                return a.guestFamilyName.localeCompare(b.guestFamilyName);
            } else if (sortKey === 'guestFamilyName' && sortOrder === "desc"){
                return b.guestFamilyName.localeCompare(a.guestFamilyName);
            } else if (sortKey === 'startDate' && sortOrder === "asc") {
                return new Date(a.startDate) - new Date(b.startDate);
            } else if (sortKey === 'startDate' && sortOrder === "desc") {
                return new Date(b.startDate) - new Date(a.startDate) ;    
            } else if (sortKey === 'createdDate'&& sortOrder === "asc") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            else if (sortKey === 'createdDate' && sortOrder === "desc") {
                return new Date(b.createdAt) - new Date(a.createdAt) ;
            }
            return 0;
        });
    }, [results, sortKey, sortOrder]);
    useEffect(()=>{
        console.log("QueryResults,sortKey, sortOrder",sortKey, sortOrder);
        console.log("sortedResults",sortedResults)
    });
    return (
        <div className='lg:w-4/5 mx-auto my-10 px-10 py-6 bg-white rounded-3xl shadow-xl overflow-hidden text-gray-600'>
            <div className='mb-4'>
                <p><span className='text-sm text-gray-400'>Anzahl der Suchergebnisse:</span> {results.length}</p>
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex mb-4  space-x-4 mt-2'>
                        <label htmlFor="sort"><span className='text-sm text-gray-400'>Sortierung:</span></label>
                        <select id="sort" value={sortKey} onChange={e => setSortKey(e.target.value)} className="rounded bg-white border border-gray-300 p-1">
                            <option value="createdDate">Erstellungsdatum der Bestellung</option>
                            <option value="guestFamilyName">Nachname des Kunden</option>
                            <option value="startDate">Startdatum der Bestellung</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        // className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0 px-2 rounded inline-flex items-center text-2xl "
                        className=" py-1 px-2 text-xl bg-teal-dark border border-forest-green text-white font-medium rounded-2xl cursor-pointer shadow-sm hover:bg-forest-green transition text-sm text-center animate-bounce-on-hover"
                        >
                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    </button>
                </div>
            </div>
            {results.length === 0 ? (
                <p className='text-[#9C785E]'>Keine Buchungstickets</p>
            ) : (
                <ul className='flex flex-col space-y-2 px-10'>
                    {sortedResults.map((result, index) => (
                        <li key={index} className='border border-gray-300 py-1 px-1 rounded-md cursor-pointer px-6 hover:bg-gray-100 hover:text-black'
                        onClick={()=>fetchBooking(result.bookingNumber)}>
                            <p><span className='text-sm text-gray-400'>Buchungsnummer: </span> {result.bookingNumber}</p>
                            <p><span className='text-sm text-gray-400'>Status:</span> {result.status}</p>
                            <div className='flex justify-between flex-col md:flex-row'>
                                <p><span className='text-sm text-gray-400'>Email: </span>{result.email}</p>
                                <p><span className='text-sm text-gray-400'>Gast Name:</span> {result.guestFirstName} {result.guestFamilyName}</p>
                            </div>

                            <div className='flex justify-between flex-col md:flex-row'>
                                <p><span className='text-sm text-gray-400'>Haus Type:</span> {result.houseType}</p>
                                {result.houseNum!== "" && <p><span className='text-sm text-gray-400'>Haus Nummer: </span>{result.houseNum}</p>}
                            </div>
                            <p><span className='text-sm text-gray-400'>Datum: </span>{new Date(result.startDate).toLocaleDateString('de-DE')} <span className='text-sm text-gray-400'>bis</span> {new Date(result.endDate).toLocaleDateString('de-DE')}</p>
                            <p><span className='text-gray-500 text-sm'>Erstellt um:</span> {new Date(result.createdAt).toLocaleDateString('de-DE')}</p>
                            
                        </li>
                    ))}
                </ul>
            )}
            {hasMore && (
                <button onClick={onLoadMore}  className=" mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-teal-dark border border-forest-green text-white font-medium rounded-full cursor-pointer shadow-sm hover:bg-forest-green transition text-sm w-full text-center animate-bounce-on-hover"
>
                    Weiterleitung
                </button>
            )}
        </div>
    );
}

