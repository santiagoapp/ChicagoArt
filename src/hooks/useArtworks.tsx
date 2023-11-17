import React, { useEffect, useState } from "react"
import { ArtWork } from "./types"
import fetchData from "../utils/api"
import { API_URL } from "../utils/constants"

interface ResultProps {
    pagination?: {
        total: number
        limit: number
        offset: number
        total_pages: number
        current_page: number
        next_url: string
    }
    data?: ArtWork[]
}

const useArtworks = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResultProps>({});

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await fetchData(API_URL)
            setResult(data);
            setLoading(false);
        }
        getData();
    }, [])

    return { loading, artworks: result.data, pagination: result.pagination }
}

export default useArtworks;