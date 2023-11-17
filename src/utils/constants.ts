export const API_URL = "https://api.artic.edu/api/v1/artworks"
export const IIIF_URL = (id:string, w:string = '', h:string = '') => `https://www.artic.edu/iiif/2/${id}/full/${w},${h}/0/default.jpg`