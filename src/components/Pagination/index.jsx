import { Button } from '@headlessui/react';
import { usePagination } from '../../hooks/usePagination';
import styles from './Pagination.module.css';

const Pagination = ({ totalCount, pageSize = 20 }) => {
    const { page, setPage } = usePagination();
    const totalPages = Math.ceil(totalCount / pageSize);

    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.pagination_buttons}>
                <Button
                    className={styles.pagination_button}
                    type="button"
                    onClick={() => setPage(1)}
                    disabled={page <= 1}
                >
                    First
                </Button>
                <Button
                    className={styles.pagination_button}
                    type="button"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                >
                    Prev
                </Button>
            </div>
            <div className={styles.pagination_pages}>
                {pages.map((p) => (
                    <Button
                        key={p}
                        className={`${styles.pagination_page} ${p === page ? styles.active : ''}`.trim()}
                        type="button"
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </Button>
                ))}
            </div>
            <div className={styles.pagination_buttons}>
                <Button
                    className={styles.pagination_button}
                    type="button"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                >
                    Next
                </Button>
                <Button
                    className={styles.pagination_button}
                    type="button"
                    onClick={() => setPage(totalPages)}
                    disabled={page >= totalPages}
                >
                    Last
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
