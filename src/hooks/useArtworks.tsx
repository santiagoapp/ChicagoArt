import React, { useEffect, useState } from "react"
import { ArtWork, PaginationProps } from "./types"
import fetchData from "../utils/api"
import { API_URL } from "../utils/constants"


const useArtworks = (next?: string) => {
    const [loading, setLoading] = useState(false);
    const [artworks, setArtworks] = useState<ArtWork[]>([]);
    const [pagination, setPagination] = useState<PaginationProps | undefined>();
    const limit = "5"

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await fetchData(next ? next : API_URL, next ? {} : { limit })
            setArtworks([...artworks, ...data?.data]);
            setPagination(data.pagination);
            setLoading(false);
        }
        getData();
    }, [next])

    return { loading, artworks, pagination}
}

export default useArtworks;