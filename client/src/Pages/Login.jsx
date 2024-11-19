import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { StatemgmtAction } from '../Redux/User/UserSlice.js';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormdata] = useState({});
    const [error1, setError] = useState('');

    const changeHandler = async (e) => {
        setFormdata({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const getUserData = async () => {

        try {
            const email = formData.email;
            const res = await fetch(`https://cktalkfusion-backend.onrender.com/api/auth/getuserdata/${email}`);
            const data = await res.json();

            if (data.success == false) {
                setError(data.message);
                console.log("error at get data user: ", data);
            }

            dispatch(StatemgmtAction.StoreCurrentUser(data.user));
            localStorage.setItem("currentUser", JSON.stringify(data.user));  // Save to localStorage
            console.log(localStorage.setItem("currentUser", JSON.stringify(data.user)));
            
            // console.log("current data of user", data.user);


        } catch (error) {
            console.error("error at getuserdata: ", error);
        }
    }   

    const handleRegister = async (event) => {
        setError("");
        event.preventDefault();

        try {
            const res = await fetch(`https://cktalkfusion-backend.onrender.com/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Something went wrong!");
                return;
            }

            getUserData();
            // alert("login success")
            navigate("/chat");

        } catch (error) {
            setError("Error :" + error.message);
        }
    }


    return (
        <div className='bg-light-blue h-screen'>
            <h2 className='text-center pt-36 pb-12 text-4xl font-bold'>Login</h2>

            <form onSubmit={handleRegister}>
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
                    Login
                </button>

            </form>


            <p className='text-center mt-4'>Haven't an Account? <Link to="/register" className='text-blue-500'>Register</Link></p>

            {error1 && <p className='text-red-700 text-lg text-center'>{error1}</p>}
        </div>

    )
}
