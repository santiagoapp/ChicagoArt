interface QueryParams {
    [key: string]: string;
}

const fields = [
    'id',
    'title',
    'image_id',
    'artist_id',
    'artist_title',
    'artist_display',
    'place_of_origin',
    'description',
    'price_display',
    'thumbnail',
    'api_link',
    'artwork_type_title',
    'date_start',
    'date_end',
    'date_display',
];

const fetchData = async (url: string, params: QueryParams) => {
    let search;

    if (params?.search) {
        search = params.search;
        delete params.search;
    }

    const queryParams = new URLSearchParams({
        ...(search ? { q: search } : {}),
        ...params,
        fields: fields.join(','),
    });

    const urlApi =
        Object.keys(params).length === 0
            ? url
            : `${url}${search ? '/search' : ''}?${queryParams}`;
    const response = await fetch(urlApi);
    const json = await response.json();
    return json;
}

export default fetchData;