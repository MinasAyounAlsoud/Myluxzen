import { useState, useEffect } from 'react';
import { QueryForm } from "../components/admin/QueryForm";
import { QueryResults } from "../components/admin/QueryResults";
import { SingleBookingTicket } from '../components/admin/SingleBookingTicket';

export const AdminBookingQueryPage = ()=>{
    const [query, setQuery] = useState(null);
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // useEffect(()=>{
    //     console.log("AdminBookingQueryPage query", query);
    // },[query]);
    const fetchResults = async (query, page = 1) => {
        const params = new URLSearchParams({
            ...query, 
            page  
        });
        const url = `http://localhost:3000/booking/query?${params.toString()}`;
        // console.log("Requesting URL:", url);
        const response = await fetch(url);
        const data = await response.json();
        console.log("received query data",data)
        setResults(prev => page === 1 ? data.bookingTickets : [...prev, ...data.bookingTickets]);
        setHasMore(data.hasMore);
        setPage(page);
    };
    const fetchBooking = async (bookingNumber) => {
        try {
            const response = await fetch(`http://localhost:3000/booking/byBookingNum/${bookingNumber}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error('Buchung Number nicht gefunden.');
            const data = await response.json();
            setBookingData(data);
            setShowDetails(true);
        } catch (err) {
            setBookingData(null);
            setShowDetails(false);
        }
    };
    const handleSearch = (formData) => {
        setQuery(formData);
        fetchResults(formData, 1);
    };
    const handleLoadMore = () => {
        fetchResults(query, page + 1);
    };
    return (
    <div>
        {!showDetails? <div>
            <QueryForm handleSearch={handleSearch} />
            <QueryResults results={results} hasMore={hasMore} onLoadMore={handleLoadMore} fetchBooking={fetchBooking}/>
        </div>
        :<div>
            <SingleBookingTicket singleBooking={bookingData} onClose={() => setShowDetails(false)}></SingleBookingTicket>
        </div>}
    </div>
    );
}