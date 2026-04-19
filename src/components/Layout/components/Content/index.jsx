import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router';
import styles from './Content.module.css';

const Content = ({ children }) => {
    const containerRef = useRef();
    const { pathname } = useLocation();

    useEffect(() => {
        containerRef.current?.scrollTo(0, 0);
    }, [pathname]);

    return (
        <main
            className={styles.container}
            ref={containerRef}
        >
            {children}
        </main>
    );
};

export default Content;
