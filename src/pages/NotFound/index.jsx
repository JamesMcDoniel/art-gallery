import { useNavigate } from 'react-router';
import styles from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1>Not Found</h1>
            <p>
                The page or resource you're looking for does not exist or has
                been moved.
            </p>
            <div>
                <button onClick={() => navigate(-1)}>Go Back</button>
                <button onClick={() => navigate('/')}>Go Home</button>
            </div>
        </div>
    );
};

export default NotFound;
