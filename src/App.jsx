import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators.jsx';
import ViewCreator from './pages/ViewCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';
import AddCreator from './pages/AddCreator.jsx';
import { useState, useEffect } from 'react';
import { supabase } from './client';

function App() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('creators').select('*');
            if (data) {
                setCreators(data);
            } else {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    async function AddFunction(creatorData) {
        const { data, error } = await supabase.from('creators').insert([creatorData]);
        if (data) {
            setCreators(prevCreators => [...prevCreators, data[0]]);
        } else {
            console.error(error);
            alert("There was an error adding the creator.");
        }
    }

    async function UpdateFunction(id, updatedData) {
        const { data, error } = await supabase.from('creators').update(updatedData).eq('id', id);
        if (data) {
            setCreators(prevCreators => {
                const index = prevCreators.findIndex(creator => creator.id === id);
                if (index !== -1) {
                    const updatedCreators = [...prevCreators];
                    updatedCreators[index] = data[0];
                    return updatedCreators;
                }
                return prevCreators;
            });
        } else {
            console.error(error);
            alert("There was an error updating the creator.");
        }
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ShowCreators creators={creators} />} />
                    <Route path="/creator/:id" element={<ViewCreator />} />
                    <Route path="/creator/:id/edit" element={<EditCreator creators={creators} onUpdateCreator={UpdateFunction} />} />
                    <Route path="/add" element={<AddCreator onAddCreator={AddFunction} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
