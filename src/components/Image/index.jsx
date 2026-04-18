import { API_URL } from '../../helpers/constants';

const Image = ({ src, className, ...rest }) => {
    return (
        <img
            className={className}
            src={`${API_URL}/${src}`}
            {...rest}
        />
    );
};

export default Image;
