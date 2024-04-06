import React, { useState } from 'react'
import { Container, Input, Button, Spinner } from '../components/index.js'
import cover from '../assets/cover.png'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useDispatch } from "react-redux";
import { login } from '../store/authSlice.js';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

function SignupPage() {

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const backend = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_DEPLOYED_SERVER

    const submit = async (data) => {
        try {
            setLoader(true);
            const response = await axios.post(`${backend}/api/v1/users/signup`, data);
            dispatch(login(response.data.data));
            localStorage.setItem("username", data.username);
            localStorage.setItem("email", data.email);
            navigate("/avatar");
        } catch (err) {
            setError(err.response?.data.message || err.message);
        } finally {
            setLoader(false);
        }
    };


    return (
        <Container className='flex items-center justify-center'>
            <div className='w-[40%] hidden h-full bg-green-500 md:flex flex-col items-center justify-center gap-6'>
                <h1 className='text-4xl font-bold text-green-800 p-6 text-center'>Discover the world's top Designers and Creatives</h1>
                <img src={cover} alt='cover' className='w-[80%]' />
            </div>
            <div className='md:w-[60%] w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit(submit)} className='md:w-[50%] w-[90%] h-[100vh] flex flex-col items-center md:justify-center justify-start md:gap-6 gap-4'>
                    <h1 className='text-4xl font-bold mt-10 md:mt-0 text-stone-700 self-start'>Sign Up To Dribbble!</h1>
                    <div className='font-semibold text-red-500 w-full h-[5vh]'>{error && <FontAwesomeIcon icon={faBan} className='mr-2' />}{error}</div>
                    <div className='w-full flex items-center justify-center gap-4'>
                        <Input
                            placeholder='ex. John'
                            register={register}
                            name='name'
                            label='Name' />
                        <Input
                            placeholder='ex. john1234'
                            label='Username'
                            register={register}
                            name='username' />
                    </div>
                    <Input
                        type='email'
                        placeholder='ex. john1234@example.com'
                        label='Email'
                        register={register}
                        name='email' />
                    <Input
                        type='password'
                        placeholder='8+ Characters'
                        name='password'
                        label='Password'
                        register={register} />
                    <div className='flex items-start justify-start gap-4'>
                        <input
                            type='checkbox'
                            className='accent-green-500 cursor-pointer mt-2 size-[40px]'
                            id='cb'
                            onChange={() => setChecked((prev) => !prev)}
                        />
                        <label htmlFor='cb' className='text-stone-700 cursor-pointer'>Creating an account means that you're agreeing to our <span className='text-blue-600 hover:underline'>Terms of Service, Privacy Policy</span>, and our default <span className='text-blue-600 hover:underline'>Notification Settings</span></label>
                    </div>
                    <Button className='self-start p-0 w-[40%] h-[6vh]' disabled={loader || !checked}>{loader ? <Spinner /> : 'Create Account'}</Button>
                    <p>
                        This site is protected by reCAPTCHA and Google <span className='text-blue-600'>Privacy Policy</span> and <span className='text-blue-600'>Terms of Service</span> apply
                    </p>
                </form>
            </div>
        </Container>
    );
}

export default SignupPage