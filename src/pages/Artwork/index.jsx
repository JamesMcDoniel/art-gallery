import { Link } from 'react-router';
import { useArtwork } from '../../hooks/useArtwork';
import NotFound from '../NotFound';
import Loading from '../../components/Loading';
import Breadcrumbs from '../../components/Breadcrumbs';
import Carousel from '../../components/Carousel';
import styles from './Artwork.module.css';

const Artwork = () => {
    const { artwork, isLoading } = useArtwork();

    return !isLoading ? (
        artwork ? (
            <section className={styles.container}>
                <div style={{ maxWidth: '900px', marginInline: 'auto' }}>
                    <Breadcrumbs />
                </div>
                <Carousel images={artwork.images} />
                <div className={styles.artwork_details}>
                    <h1>{artwork.title}</h1>
                    {artwork.artist && artwork.artistSlug ? (
                        <>
                            <span>by</span>
                            <Link
                                className={styles.artist}
                                to={`/gallery/artists/${artwork.artistSlug}`}
                            >
                                {artwork.artist}
                            </Link>
                        </>
                    ) : (
                        <>
                            <span>by</span>
                            <span className={styles.artist}>Unknown</span>
                        </>
                    )}
                </div>
            </section>
        ) : (
            <NotFound />
        )
    ) : (
        <Loading />
    );
};

export default Artwork;
