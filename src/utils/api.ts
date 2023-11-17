

interface QueryParams {
    [key:string]: string;
}

const fetchData =  async (url: string, params:QueryParams) => {
    
    const queryParams = new URLSearchParams({
        ...params
    })
    const response = await fetch(Object.keys(params).length === 0 ? url : `${url}?${queryParams}`);
    const json = await response.json();
    return json;
}

export default fetchData;