import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

function AddCreator() {
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "",
        imageURL: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        await supabase.from('creators').insert([formData]);
        alert('Content Creator added successfully!');
        navigate('/');  // Use navigate here, after successfully adding the creator
    };

    return (
        <div className="add-creator-form">
            <h2>Add a Content Creator</h2>
            <form onSubmit={handleAdd}>
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
                <button type="submit">Add Creator</button>
            </form>
        </div>
    );
}

export default AddCreator;

