import ContentCreator from '../components/ContentCreator';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ShowCreators({ creators }) {
    return (
        <div className="show-creators">
            {/* Button to Add New Content Creator */}
            <div className="add-creator-button">
                <Link to="/add">
                    <button>Add New Content Creator</button>
                </Link>
            </div>

            {/* Display the content creators or a message if none exist */}
            {creators.length === 0 ? (
                <p>No content creators found in the database.</p>
            ) : (
                <div className="all-creators">
                    {creators.map(creator => (
                        <ContentCreator key={creator.id} creator={creator} />
                    ))}
                </div>
            )}
        </div>
    );
}

ShowCreators.propTypes = {
    creators: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,  // Updated to number since your IDs are numbers
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            // Add other properties as needed
        })
    ).isRequired,
};

export default ShowCreators;
