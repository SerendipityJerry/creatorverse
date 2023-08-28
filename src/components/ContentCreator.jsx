import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ContentCreator({ creator }) {
    return (
        <div className="content-creator p-card"> {/* 'p-card' is a Picocss utility class */}
            <img className="p-card-img-top" src={creator.imageURL || 'src/creator-logo.svg'} alt={creator.name} />
            <div className="p-card-body">
                <h2 className="p-card-title">{creator.name}</h2>
                <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit Channel/Page</a>
                <p className="p-card-text">{creator.description}</p>
            </div>
            <Link to={`/creator/${creator.id}/edit`} className="btn-edit">Edit</Link>
        </div>
    );
}

ContentCreator.propTypes = {
    creator: PropTypes.shape({
        id: PropTypes.number.isRequired,  // Corrected the id prop to expect number
        imageURL: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default ContentCreator;

