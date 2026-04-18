import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const usePagination = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const params = useMemo(() => new URLSearchParams(search), [search]);
    const page = parseInt(params.get('page')) || 1;

    const setPage = useCallback(
        (newPage) => {
            params.set('page', newPage);
            navigate({ search: params.toString() });
        },
        [navigate, params]
    );

    return { page, setPage };
};
