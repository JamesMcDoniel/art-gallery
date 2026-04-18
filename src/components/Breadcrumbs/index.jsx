import { Link, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((path) => path);

    return (
        <nav
            className={styles.breadcrumbs}
            aria-label="Breadcrumb"
        >
            <ol>
                <li>
                    <Link to="/">Home</Link>
                    {pathnames.length >= 1 ? (
                        <FontAwesomeIcon icon={faChevronRight} />
                    ) : null}
                </li>

                {pathnames.map((name, index) => {
                    // if (name.toLowerCase() === 'gallery') return null;

                    const last = index === pathnames.length - 1;
                    const path = `/${pathnames.slice(0, index + 1).join('/')}`;

                    const displayedName = name
                        .replace(/-/g, ' ')
                        .split(' ')
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ');

                    return (
                        <li key={path}>
                            {last ? (
                                <span className={styles.current}>
                                    {displayedName}
                                </span>
                            ) : (
                                <>
                                    <Link to={path}>{displayedName}</Link>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
