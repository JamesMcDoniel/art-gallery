import { Navigate } from 'react-router';

const Redirect = () => {
    return (
        <Navigate
            to={'/gallery'}
            replace
        />
    );
};

export default Redirect;
