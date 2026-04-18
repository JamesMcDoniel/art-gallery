import { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuButtonRef = useRef(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        menuButtonRef.current?.focus();
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={styles.container}>
            <div>
                <Link to="/">
                    <img
                        className={styles.logo}
                        src="/landscape-white.png"
                        alt="ASUMH"
                    />
                </Link>
            </div>
            <div>
                <button
                    ref={menuButtonRef}
                    className={styles.mobile_btn}
                    onClick={toggleMobileMenu}
                >
                    {!isMobileMenuOpen ? (
                        <FontAwesomeIcon icon={faBars} />
                    ) : (
                        <FontAwesomeIcon icon={faXmark} />
                    )}
                </button>
                <nav
                    className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`.trim()}
                >
                    <ul>
                        <li>
                            <NavLink
                                className={styles.home}
                                to="/"
                                onClick={closeMobileMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/gallery"
                                onClick={closeMobileMenu}
                                end
                            >
                                Gallery
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/gallery/artists"
                                onClick={closeMobileMenu}
                            >
                                Artists
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/gallery/collections"
                                onClick={closeMobileMenu}
                            >
                                Collections
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/gallery/categories"
                                onClick={closeMobileMenu}
                            >
                                Categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/gallery/mediums"
                                onClick={closeMobileMenu}
                            >
                                Mediums
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/gallery/all"
                                onClick={closeMobileMenu}
                            >
                                All
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
