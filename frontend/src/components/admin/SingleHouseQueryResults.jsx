import React, { useState, useMemo } from 'react';

export function SingleHouseQueryResults({ results, hasMore, onLoadMore, fetchHouse}) {
    const [sortKey, setSortKey] = useState('houseType'); 

    const sortedResults = useMemo(() => {
        return results.slice().sort((a, b) => {
            if (sortKey === 'isAvailable') {
                return (b.isAvailable - a.isAvailable);
            }else if (sortKey === 'houseType') {
                return a.houseType.localeCompare(b.houseType);
            }
            return 0;
        });
    }, [results, sortKey]);

    return (
        <div className='lg:w-3/5 mx-auto my-10 px-10'>
            {/* <div className='mb-4'>
                <p>Anzahl der Suchergebnisse: {results.length}</p>
                <div className='flex justify-between items-center mb-4'>
                    <label htmlFor="sort">Sortierung:</label>
                    <select id="sort" value={sortKey} onChange={e => setSortKey(e.target.value)} className="rounded bg-white border border-gray-300">
                        <option value="houseType">Haus Type</option>
                        <option value="isAvailable">Verfügbar</option>
                    </select>
                </div>
            </div> */}
            {results.length === 0 ? (
                <p>Keine gefunden</p>
            ) : (
                <ul className='flex flex-col space-y-2'>
                    {sortedResults.map((result, index) => (
                        <li key={index} className= {`border border-gray-300 py-1 px-1 rounded-md cursor-pointer `}
                        onClick={()=>fetchHouse(result.houseNum)}
                        >
                            <p><span className='text-sm text-gray-500'>Haus Nummer: </span>{result.houseNum}</p>
                            <p><span className='text-sm text-gray-500'>Haus Type: </span>{result.houseType}</p>
                            {/* <p><span className='text-sm text-gray-500'>Verfügbar: </span>{result.isAvailable?"Ja":"Nein"}</p> */}
                            {result.bookingNum && <p><span className='text-sm text-gray-500'>Buchung Nummer: </span>{result.bookingNum}</p>}
                            {result.guestName.length>0 &&<p><span className='text-sm text-gray-500'>Gast Name: </span>{result.guestName}</p>}
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

