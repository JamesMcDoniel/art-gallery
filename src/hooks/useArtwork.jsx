import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { API_URL } from '../helpers/constants';

export const useArtwork = () => {
    const [artwork, setArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/v1/public/artwork/${slug}`
                );

                if (response.ok) {
                    const data = await response.json();
                    setArtwork(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtwork();
    }, [slug]);

    return { artwork, isLoading };
};
