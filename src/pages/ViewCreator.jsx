import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import { supabase } from '../client';

function ViewCreator() {
    const [creator, setCreator] = useState(null);
    const { id } = useParams();  // This hook gets the route parameters, in this case, the content creator's id.

    useEffect(() => {
        async function fetchCreator() {
            const { data, error } = await supabase.from('creators').select('*').eq('id', id);
            if (data) {
                setCreator(data[0]);  // Since we're fetching by ID, we expect only one result. Take the first item from the returned array.
            } else {
                console.error(error);
            }
        }
        fetchCreator();
    }, [id]);  // Dependency on 'id' to re-run the effect if id changes.

    if (!creator) {
        return <div>Loading...</div>;
    }

    return (
        <div className="creator-details">
            <img src={creator.image} alt={creator.name} />
            <h2>{creator.name}</h2>
            <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit Channel/Page</a>
            <p>{creator.description}</p>

            {/* Edit Link */}
            <Link to={`/creator/${creator.id}/edit`} className="btn-edit">Edit</Link>
        </div>
    );
}

export default ViewCreator;
