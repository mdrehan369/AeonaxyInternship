import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Container } from '../components/index.js';
import axios from "axios";
import { useSelector } from "react-redux";

const EmailVerificationPage = () => {

    const user = useSelector(state => state.auth.user);
    const backend = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_DEPLOYED_SERVER

    useEffect(() => {
        ;(async () => {
            try {
                await axios.get(`${backend}/api/v1/users/email/${user?.email || localStorage.getItem('email')}`);      
            } catch (err) {
                console.log(err);
            }
        })();
    }, [])

    return (
        <Container className="flex flex-col items-center justify-center text-lg">
            <div className='flex flex-col items-center justify-start md:w-[50%] mb-10 md:md-0 w-[90%] md:mt-0 mt-10'>
                <h2 className="text-4xl font-bold mb-4 text-center text-stone-600">Please verify your email...</h2>
                <FontAwesomeIcon icon={faEnvelope} className='md:text-[15vw] text-[30vw] text-gray-500' />
                <p className="text-gray-700 mb-4 text-center space-y-4">
                    <span>We've sent a confirmation email to:</span>
                    <div className="font-bold text-xl">{user?.email || localStorage.getItem('email')}</div>
                </p>
                <p className="text-gray-600 mb-4 text-center">Click the confirmation link in that email to begin using Dribbble.</p>
                <div className="flex flex-col space-y-2">
                    <p className="text-gray-600 text-center">Didn't receive the email? Check your Spam folder, it may have been caught by a filter. If you still don't see it, you can <a href="#" className="text-green-500 hover:underline">resend the confirmation email</a>.</p>
                    <p className="text-gray-600 text-center">Wrong email address? <a href="#" className="text-green-500 hover:underline">Change it</a>.</p>
                </div>
            </div>
        </Container>
    );
};

export default EmailVerificationPage;