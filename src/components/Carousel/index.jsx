import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@headlessui/react';
import Image from '../Image';
import styles from './Carousel.module.css';

const Carousel = ({ images = [] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className={styles.carousel}>
            <div
                className={styles.viewport}
                ref={emblaRef}
            >
                <div className={styles.container}>
                    {images.map((image) => (
                        <div
                            key={image}
                            className={styles.slide}
                        >
                            <Image
                                className={styles.image}
                                src={image}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Button
                className={`${styles.button} ${styles.prev}`}
                type="button"
                onClick={scrollPrev}
            >
                &#10094;
            </Button>
            <Button
                className={`${styles.button} ${styles.next}`}
                type="button"
                onClick={scrollNext}
            >
                &#10095;
            </Button>
        </div>
    );
};

export default Carousel;
