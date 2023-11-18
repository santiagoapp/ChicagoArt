import {useEffect, useState} from 'react';
import {ArtWork} from './types';
import fetchData from '../utils/api';

const useArtwork = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [artwork, setArtwork] = useState<ArtWork | undefined>();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchData(url, {});
      setArtwork(data?.data);
      setLoading(false);
    };
    getData();
  }, [url]);

  return {loading, artwork};
};

export default useArtwork;