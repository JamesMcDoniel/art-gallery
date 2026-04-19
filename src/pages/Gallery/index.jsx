import { Link } from 'react-router';
import styles from './Gallery.module.css';
import Breadcrumbs from '../../components/Breadcrumbs';

const Gallery = () => {
    return (
        <section className={styles.container}>
            <Breadcrumbs />

            <div className={styles.grid_container}>
                <Link
                    className={styles.card}
                    to="/gallery/artists"
                >
                    <div className={styles.card_content}>
                        <p className={styles.card_title}>Artists</p>
                        <img
                            src="artists.webp"
                            alt="image of woman painting"
                        />
                    </div>
                </Link>
                <Link
                    className={styles.card}
                    to="/gallery/collections"
                >
                    <div className={styles.card_content}>
                        <p className={styles.card_title}>Collections</p>
                        <img
                            src="collections.webp"
                            alt="image of various artworks displayed"
                        />
                    </div>
                </Link>
                <Link
                    className={styles.card}
                    to="/gallery/categories"
                >
                    <div className={styles.card_content}>
                        <p className={styles.card_title}>Categories</p>
                        <img
                            src="categories.webp"
                            alt="image of various pictures and knickknacks on shelves"
                        />
                    </div>
                </Link>
                <Link
                    className={styles.card}
                    to="/gallery/mediums"
                >
                    <div className={styles.card_content}>
                        <p className={styles.card_title}>Mediums</p>
                        <img
                            src="mediums.webp"
                            alt="image of woman painting"
                        />
                    </div>
                </Link>
                <Link
                    className={styles.card}
                    to="/gallery/all"
                >
                    <div className={styles.card_content}>
                        <p className={styles.card_title}>All Artwork</p>
                        <img
                            src="all.webp"
                            alt=""
                        />
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default Gallery;
