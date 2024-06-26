import React, { useState } from 'react';
import axios from 'axios';

const PreparationForm = () => {
    const [organization, setOrganization] = useState('');
    const [subject, setSubject] = useState('');
    const [exam, setExam] = useState('');
    const [faculty, setFaculty] = useState('');

    const handleEnrollNow = () => {
        // Implement enroll functionality here
        alert('Enrolled successfully!');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Example: POST request to create a new organization
            const response = await axios.post('/api/organizations', { name: organization, location: 'Example Location' });
            console.log('New organization created:', response.data);
            // Add similar requests for subjects, exams, faculties
        } catch (err) {
            console.error('Error creating organization:', err);
            alert('Error creating organization');
        }
    };

    return (
        <div>
            <h2>Preparation Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Choose an Organization:
                    <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                </label>
                {/* Add inputs for Subject, Exam, Faculty */}
                <button type="submit">Submit</button>
            </form>
            <button onClick={handleEnrollNow}>Enroll Now</button>
        </div>
    );
};

export default PreparationForm;
