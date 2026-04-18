import { Link, useParams } from 'react-router';
import { useGalleryType } from '../../hooks/useGalleryType';
import Loading from '../../components/Loading';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pagination from '../../components/Pagination';
import styles from './GalleryType.module.css';

const GalleryType = () => {
    const { data, totalCount, isLoading } = useGalleryType();
    const { type } = useParams();

    return !isLoading ? (
        <section className={styles.container}>
            <Breadcrumbs />

            {data.length > 0 ? (
                <>
                    <div className={styles.grid_container}>
                        {data.map((item) => (
                            <Link
                                className={styles.card}
                                key={item.slug}
                                to={`/gallery/${type}/${item.slug}`}
                                aria-label={item.slug}
                            >
                                <div className={styles.card_content}>
                                    <p className={styles.card_title}>
                                        {item.name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Pagination totalCount={totalCount} />
                </>
            ) : (
                <p>No items found</p>
            )}
        </section>
    ) : (
        <Loading />
    );
};

export default GalleryType;
