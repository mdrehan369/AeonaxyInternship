import React, { useState } from 'react'
import { Button, Container, Spinner, Options } from '../components/index.js'
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

function OptionsPage() {

    const [option, setOption] = useState('');
    const options = [
        { image: pic1, text: "I am a designer looking to share my work" },
        { image: pic2, text: "I'm looking to hire a designer" },
        { image: pic3, text: "I'm looking for design inspiration" },
    ]
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const backend = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_DEPLOYED_SERVER;

    const submit = async () => {

        try {
            setLoader(true);
            await axios.post(`${backend}/api/v1/users/option`, {
                option,
                username: user?.username || localStorage.getItem('username')
            });
            navigate("/verifyEmail");
        } catch (err) {
            setError(err.response?.data.message || err.message);
            window.scrollTo(0, 0);
            console.log(err);
        } finally {
            setLoader(false);
        }
    };

    return (
        <Container className='flex flex-col items-center justify-around md:mb-0 mb-6 scroll-smooth'>
            <div className='md:w-[50%] w-full text-center space-y-2 md:mt-0 mt-10'>
                <h1 className='md:text-4xl text-2xl font-bold text-stone-600'>What brings you to Dribbble?</h1>
                <p className='text-stone-600'>Select the options that best describe you. Dont worry, you can explore other options later</p>
                <div className='font-semibold text-red-500 w-full h-[5vh]'>{error && <FontAwesomeIcon icon={faBan} className='mr-2' />}{error}</div>
            </div>
            <div className='flex md:flex-row flex-col items-center md:h-[50%] justify-center gap-10 md:gap-16 md:mb-0 mb-10'>
                {options.map((val, key) => (
                    <Options
                        key={key}
                        image={val.image}
                        text={val.text}
                        option={option}
                        onClick={() => setOption(val.text)}
                    />
                ))}
            </div>
            <Button className='p-0 md:w-[15vw] h-[6vh] w-[80%]' disabled={loader} onClick={submit}>
                {loader ? <Spinner /> : 'Finish'}
            </Button>
        </Container>
    )
}

export default OptionsPage