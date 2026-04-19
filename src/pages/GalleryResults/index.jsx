import { Link } from 'react-router';
import { useGalleryResult } from '../../hooks/useGalleryResult';
import Loading from '../../components/Loading';
import Image from '../../components/Image';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pagination from '../../components/Pagination';
import styles from './GalleryResults.module.css';

const GalleryResults = () => {
    const { data, totalCount, isLoading } = useGalleryResult();

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
                                to={`/artwork/${item.slug}`}
                                aria-label={item.title}
                            >
                                {item.imagePath ? (
                                    <Image
                                        src={item.imagePath}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                ) : null}
                                <div className={styles.card_content}>
                                    <p className={styles.card_title}>
                                        {item.title}
                                    </p>
                                    {item.artist ? (
                                        <p className={styles.card_artist}>
                                            <span>by</span>
                                            {item.artist
                                                ? item.artist
                                                : 'Unknown'}
                                        </p>
                                    ) : null}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Pagination totalCount={totalCount} />
                </>
            ) : (
                <p className={styles.empty}>No Results Found</p>
            )}
        </section>
    ) : (
        <Loading />
    );
};

export default GalleryResults;
