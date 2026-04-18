import { useState, useEffect, useRef, useCallback } from 'react';
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
import styles from './Carousel.module.css';

const Carousel = () => {
    const [images, setImages] = useState([]);
    const [_page, setPage] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const originalImages = useRef([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: false })
    ]);

    useEffect(() => {
        const fetchInitial = async () => {
            const response = await fetch(
                `${API_URL}/api/v1/public/recommendations`
            );
            const data = await response.json();

            const initialSet = [data.randomImagePath, ...data.recommendations];

            originalImages.current = initialSet;
            setImages(initialSet);
        };

        fetchInitial();
    }, []);

    const loadMore = useCallback(
        async (pageNum) => {
            if (isLoading) return;

            setIsLoading(true);

            try {
                const response = await fetch(
                    `${API_URL}/api/v1/public/random?page=${pageNum}&pageSize=10`
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
        if (!emblaApi || !isFullscreen) return;

        const onSelect = () => {
            const currentIndex = emblaApi.selectedScrollSnap();
            const totalSlides = emblaApi.scrollSnapList().length;

            if (currentIndex >= totalSlides - 2 && !isLoading) {
                setPage((prev) => {
                    const nextPage = prev + 1;
                    loadMore(nextPage);

                    return nextPage;
                });
            }
        };

        emblaApi.on('select', onSelect);
        return () => emblaApi.off('select', onSelect);
    }, [emblaApi, isFullscreen, isLoading, loadMore]);

    useEffect(() => {
        const handleFsChange = () => {
            const isFs = !!document.fullscreenElement;
            setIsFullscreen(isFs);

            if (emblaApi) {
                const plugins = isFs
                    ? [
                          Autoplay({ delay: 5000, stopOnInteraction: false }),
                          Fade()
                      ]
                    : [Autoplay({ delay: 5000, stopOnInteraction: false })];

                if (!isFs) {
                    setImages(originalImages.current);
                    setPage(1);

                    emblaApi.scrollTo(0, true);
                }

                emblaApi.reInit({ loop: !isFs }, plugins);
            }
        };

        document.addEventListener('fullscreenchange', handleFsChange);
        return () =>
            document.removeEventListener('fullscreenchange', handleFsChange);
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi) {
            const currentIndex = emblaApi.selectedScrollSnap();

            emblaApi.reInit();
            emblaApi.scrollTo(currentIndex, true);
        }
    }, [images, emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const toggleFullscreen = useCallback(() => {
        const element = document.getElementById('fullscreen');

        if (!document.fullscreenElement) {
            element.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, []);

    return (
        <div className={styles.carousel_container}>
            <div
                id="fullscreen"
                className={isFullscreen ? styles.embla_fs : styles.embla}
                ref={emblaRef}
            >
                <div className={styles.embla__container}>
                    {images.map((src, index) => (
                        <div
                            className={styles.embla__slide}
                            key={`${src}-${index}`}
                        >
                            <Image
                                className={styles.embla__img}
                                src={src}
                                alt=""
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
        </div>
    );
};

export default Carousel;
