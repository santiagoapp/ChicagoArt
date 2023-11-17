import React, { useEffect, useState } from "react"
import { ArtWork } from "./types"


interface ResultProps {
    pagination?: {
        total: number
        limit: number
        offset: number
        total_pages: number
        current_page: number
        next_url: string
    }
    data?: ArtWork | ArtWork[]
}

const useAPI = (url: string) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResultProps>({});

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const response = await fetch(url);
            const json = await response.json();
            setResult(json);
            setLoading(false);
        }
        getData();
    }, [])

    return { loading, result }
}

export default useAPI;