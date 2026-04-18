import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { API_URL } from '../helpers/constants';

const typeToQuery = {
    artists: 'artist',
    collections: 'collection',
    mediums: 'medium',
    categories: 'category'
};

export const useGalleryType = () => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { type } = useParams();
    const { search } = useLocation();

    useEffect(() => {
        const fetchCategories = async () => {
            const params = new URLSearchParams(search);

            if (!params.get('page')) {
                params.set('page', '1');
            }

            if (type) {
                const key = typeToQuery[type];
                if (key) {
                    params.set('type', key);
                }
            }

            setIsLoading(true);

            const queryString = params.toString();

            try {
                const response = await fetch(
                    `${API_URL}/api/v1/public/gallery/types?${queryString}`
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

        fetchCategories();
    }, [search, type]);

    return { data, totalCount, isLoading };
};
