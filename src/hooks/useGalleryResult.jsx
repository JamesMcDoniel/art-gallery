import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { API_URL } from '../helpers/constants';

const typeToQuery = {
    artists: 'artist',
    collections: 'collection',
    mediums: 'medium',
    categories: 'category',
    all: 'all'
};

export const useGalleryResult = () => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { type, slug } = useParams();
    const { search } = useLocation();

    useEffect(() => {
        const fetchArtwork = async () => {
            const params = new URLSearchParams(search);

            if (!params.get('page')) {
                params.set('page', '1');
            }

            if (type && slug) {
                const key = typeToQuery[type];
                if (key) {
                    params.set(key, slug);
                }
            }

            setIsLoading(true);

            const queryString = params.toString();

            try {
                const response = await fetch(
                    `${API_URL}/api/v1/public/gallery/results?${queryString}`
                );

                if (!response.ok) {
                    throw new Error('Error fetching artwork');
                }

                const data = await response.json();

                console.log(data);
                setData(data.items || []);
                setTotalCount(data.totalCount || 0);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtwork();
    }, [type, slug, search]);

    return { data, totalCount, isLoading };
};
