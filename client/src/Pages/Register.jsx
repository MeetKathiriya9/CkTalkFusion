import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

export default function Register() {

    const [error1, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFromData] = useState({})

    const changeHandler = (event) => {
        setFromData({
            ...formData,
            [event.target.id]: event.target.value,
        })
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');

        // console.log(formData);

        try {
            const res = await fetchAPI("api/auth/add", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ formData })
            })

            const data = await res.json();

            if (data.success == false) {

                setError(data.message);
                return;
            }

            alert('User registered successfully!');
            navigate('/')

        } catch (error) {

            setError(error.message);

        }
    };


    return (
        <div className='bg-light-blue h-screen'>
            <h2 className='text-center pt-36 pb-12 text-4xl font-bold'>Register</h2>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    id='name'
                    placeholder="Username"
                    onChange={changeHandler}
                    className='m-auto flex ps-3 my-4 w-96 h-14 rounded-lg text-md outline-none'
                />
                <input
                    type="email"
                    id='email'
                    placeholder="Email"
                    onChange={changeHandler}
                    className='m-auto flex ps-3 my-4 w-96 h-14 rounded-lg text-md outline-none'
                />
                <input
                    type="password"
                    id='password'
                    placeholder="Password"
                    onChange={changeHandler}
                    className='m-auto flex ps-3 w-96 h-14 rounded-lg text-md outline-none'
                />

                <button
                    type='submit'
                    className='bg-dark-blue m-auto flex mt-14 w-96 justify-center py-3 text-lg font-bold text-white rounded-3xl hover:bg-blue-700 ease-in-out duration-500'
                >
                    Register
                </button>

            </form>


            <p className='text-center mt-4'>Already Have an Account? <Link to="/" className='text-blue-500'>Login</Link></p>

            {error1 && <p className='text-red-400'>{error1}</p>}
        </div>
    );
};

