import { useState, useEffect } from 'react';
import { QueryForm } from "../components/admin/QueryForm";
import { QueryResults } from "../components/admin/QueryResults";
import { SingleBookingTicket } from '../components/admin/SingleBookingTicket';
import { SingleHouseQueryForm } from '../components/admin/SingleHouseQueryForm';
import { SingleHouseQueryResults } from '../components/admin/SingleHouseQueryResults';

export const AdminSingleHouseQueryPage = ()=>{
    const [query, setQuery] = useState(null);
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
  
    // useEffect(()=>{
    //     console.log("AdminBookingQueryPage query", query);
    // },[query]);
    const fetchResults = async (query, page = 1) => {
        const params = new URLSearchParams({
            ...query, 
            page  
        });
        const url = `http://localhost:3000/singleHouse/query?${params.toString()}`;
        // console.log("Requesting URL:", url);
        const response = await fetch(url);
        const data = await response.json();
        console.log("received query data",data)
        setResults(prev => page === 1 ? data.singleHouses : [...prev, ...data.singleHouses]);
        setHasMore(data.hasMore);
        setPage(page);
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
        <SingleHouseQueryForm handleSearch={handleSearch}></SingleHouseQueryForm>
        <SingleHouseQueryResults results={results} hasMore={hasMore} onLoadMore={handleLoadMore}></SingleHouseQueryResults>

    </div>
    );
}