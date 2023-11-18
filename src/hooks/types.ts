export interface ArtWork {
    id: number;
    title: string;
    image_id: string;
    artist_id: string;
    artist_title: string;
    artist_display: string;
    place_of_origin: string;
    description: string;
    price_display: string;
    thumbnail: {
      lqip: string;
    };
    api_link: string;
    artwork_type_title: string;
    date_start: number;
    date_end: number;
    date_display: string;
  }
  
  export interface PaginationProps {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
  }