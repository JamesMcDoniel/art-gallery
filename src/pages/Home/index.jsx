import { Link } from 'react-router';
import Carousel from '../../components/Carousel';
import styles from './Home.module.css';

const Home = () => {
    return (
        <section className={styles.container}>
            <div className={styles.hero}>
                <Carousel />
                <div className={styles.hero_text}>
                    <h1>ASUMH Art Gallery</h1>
                    <p>
                        Celebrating the creative vision and artistic excellence
                        of our local Ozarks artists.
                    </p>
                    <Link to="/gallery">Explore the Gallery</Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
