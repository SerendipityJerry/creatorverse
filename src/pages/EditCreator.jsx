import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams, useNavigate } from 'react-router-dom';

function EditCreator() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "",
        imageURL: ""
    });

    useEffect(() => {
        async function fetchCreator() {
            const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
            if (data) {
                setFormData(data);
            } else {
                console.error(error);
                alert('There was an error fetching the creator data.');
            }
        }
        fetchCreator();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await supabase.from('creators').update(formData).eq('id', id);
            alert('Content Creator updated successfully!');
            navigate('/');
    };

    async function deleteCreator() {
        const { error } = await supabase.from('creators').delete().eq('id', id);
        if (error) {
            console.error('Error deleting content creator:', error);
            alert('There was an error deleting the creator.');
        } else {
            alert('Content Creator deleted successfully!');
            navigate('/');
        }
    }

    return (
        <div className="edit-creator-form">
            <h2>Edit Content Creator</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>URL: </label>
                    <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Image URL (optional): </label>
                    <input
                        type="url"
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Creator</button>
            </form>

            {/* Button to delete the content creator */}
            <button onClick={deleteCreator} className="btn-delete">
                Delete Creator
            </button>
        </div>
    );
}

export default EditCreator;