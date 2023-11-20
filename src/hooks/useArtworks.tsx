import React, { useEffect, useState } from "react"
import { ArtWork, PaginationProps } from "./types"
import fetchData from "../utils/api"
import { API_URL } from "../utils/constants"


const useArtworks = (next?: number, search?: string) => {
    const [loading, setLoading] = useState(false);
    const [artworks, setArtworks] = useState<ArtWork[]>([]);
    const [pagination, setPagination] = useState<PaginationProps | undefined>();
    const limit = "5"

    useEffect(() => {
        let queryParams: { [key: string]: string } = { limit };
        if (next) {
            queryParams = { ...queryParams, page: String(next) };
        }
        if (search) {
            queryParams = { ...queryParams, search };
        }
        const getData = async () => {
            setLoading(true);
            const data = await fetchData(API_URL, queryParams)
            setArtworks([...artworks, ...data?.data]);
            setPagination(data.pagination);
            setLoading(false);
        }
        getData();
    }, [next, search])

    return { loading, artworks, pagination }
}

export default useArtworks;