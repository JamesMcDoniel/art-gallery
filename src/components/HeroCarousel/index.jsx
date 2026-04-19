import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { Button } from '@headlessui/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUpRightAndDownLeftFromCenter,
    faDownLeftAndUpRightToCenter
} from '@fortawesome/free-solid-svg-icons';
import Image from '../Image';
import { API_URL } from '../../helpers/constants';
import styles from './HeroCarousel.module.css';

const HeroCarousel = () => {
    const [images, setImages] = useState([]);
    const [_page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const originalImages = useRef([]);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: false })
    ]);

    const fetchInitialImages = useCallback(async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/v1/public/recommendations`
            );
            const data = await response.json();
            const initialSet = [data.randomImage, ...data.recommendations];

            originalImages.current = initialSet;
            setImages(initialSet);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const loadMoreImages = useCallback(
        async (nextPage) => {
            if (isLoading) return;
            setIsLoading(true);

            try {
                const response = await fetch(
                    `${API_URL}/api/v1/public/random?page=${nextPage}&pageSize=10`
                );
                const data = await response.json();

                setImages((prev) => [...prev, ...data]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        },
        [isLoading]
    );

    useEffect(() => {
        fetchInitialImages();
    }, [fetchInitialImages]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            const index = emblaApi.selectedScrollSnap();
            const total = emblaApi.scrollSnapList().length;

            if (images[index]) {
                setCurrentImage(images[index]);
            }

            if (isFullscreen && index >= total - 2 && !isLoading) {
                setPage((prev) => {
                    const nextPage = prev + 1;

                    loadMoreImages(nextPage);
                    return nextPage;
                });
            }
        };

        emblaApi.on('select', onSelect);
        return () => emblaApi.off('select', onSelect);
    }, [emblaApi, isFullscreen, isLoading, images, loadMoreImages]);

    useEffect(() => {
        const handleFsChange = () => {
            const isFs = !!document.fullscreenElement;
            setIsFullscreen(isFs);

            if (!emblaApi) return;

            const plugins = isFs
                ? [Autoplay({ delay: 5000, stopOnInteraction: false }), Fade()]
                : [Autoplay({ delay: 5000, stopOnInteraction: false })];

            if (!isFs) {
                setImages(originalImages.current);
                setPage(1);

                emblaApi.scrollTo(0, true);
            }

            emblaApi.reInit({ loop: !isFs }, plugins);
        };

        document.addEventListener('fullscreenchange', handleFsChange);
        return () =>
            document.removeEventListener('fullscreenchange', handleFsChange);
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi) emblaApi.reInit();
    }, [images, emblaApi]);

    const toggleFullscreen = useCallback(() => {
        const element = document.getElementById('fullscreen');

        if (!document.fullscreenElement) {
            element.requestFullscreen().catch(console.log);
        } else {
            document.exitFullscreen();
        }
    }, []);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <div className={styles.carousel_container}>
            {images.length > 0 ? (
                <div
                    id="fullscreen"
                    className={isFullscreen ? styles.embla_fs : styles.embla}
                    ref={emblaRef}
                >
                    <div className={styles.embla__container}>
                        {images.map((image, index) => (
                            <div
                                className={styles.embla__slide}
                                key={`${image.path}-${index}`}
                            >
                                <Image
                                    className={styles.embla__img}
                                    src={image.path}
                                    alt={image.title}
                                />
                            </div>
                        ))}
                    </div>
                    {!isFullscreen ? (
                        <>
                            <Button
                                className={`${styles.nav_button} ${styles.prev}`}
                                type="button"
                                onClick={scrollPrev}
                                aria-label="Previous Slide"
                            >
                                &#10094;
                            </Button>
                            <Button
                                className={`${styles.nav_button} ${styles.next}`}
                                type="button"
                                onClick={scrollNext}
                                aria-label="Next Slide"
                            >
                                &#10095;
                            </Button>
                        </>
                    ) : null}

                    {currentImage ? (
                        <div className={styles.image_details}>
                            <Link
                                className={styles.gallery_link}
                                to={`/artwork/${currentImage.slug}`}
                            >
                                <span className={styles.title}>
                                    {currentImage.title}
                                </span>
                            </Link>
                            {currentImage.artist && currentImage.artistSlug ? (
                                <Link
                                    className={styles.gallery_link}
                                    to={`/gallery/artists/${currentImage.artistSlug}`}
                                >
                                    <span className={styles.by_artist}>by</span>
                                    <span className={styles.artist}>
                                        {currentImage.artist}
                                    </span>
                                </Link>
                            ) : (
                                <>
                                    <span className={styles.by_artist}>by</span>
                                    <span className={styles.null_artist}>
                                        Unknown
                                    </span>
                                </>
                            )}
                        </div>
                    ) : null}

                    <Button
                        className={styles.fs_toggle}
                        type="button"
                        onClick={toggleFullscreen}
                        aria-label="Full Screen"
                    >
                        <FontAwesomeIcon
                            icon={
                                isFullscreen
                                    ? faDownLeftAndUpRightToCenter
                                    : faUpRightAndDownLeftFromCenter
                            }
                            flip="horizontal"
                        />
                    </Button>
                </div>
            ) : (
                <div className={styles.empty}>
                    <p>Oops!</p>
                    <p>There doesn't appear to be any Artwork yet!</p>
                </div>
            )}
        </div>
    );
};

export default HeroCarousel;
