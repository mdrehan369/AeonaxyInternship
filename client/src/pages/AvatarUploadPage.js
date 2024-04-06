import React, { useState } from 'react';
import { Input, Button, Spinner, Container } from '../components/index.js';
import { useForm } from 'react-hook-form';
import camera from "../assets/camera.png"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { login } from '../store/authSlice.js';
import { useNavigate } from "react-router-dom";
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileCreationPage = () => {

  const { register, handleSubmit } = useForm();
  const [avatarPath, setAvatarPath] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const user = useSelector(state => state.auth.user);
  const backend = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_DEPLOYED_SERVER;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      setLoader(true);

      const formData = new FormData();
      formData.append("username", user.username || localStorage.getItem('username'));
      formData.append("location", data.location);
      formData.append("avatar", avatarPath);

      const response = await axios.post(`${backend}/api/v1/users/avatar`, formData);
      dispatch(login(response.data.data));
      navigate('/options');

    } catch (err) {
      console.log(err);
      setError(err.response?.data.message || err.message);
    } finally {
      setLoader(false);
    }
  }

  return (
    <Container className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(submit)} className="w-full md:w-[50%] px-6 py-8 rounded-lg flex flex-col">

        <h1 className="text-2xl md:text-4xl font-bold text-stone-600 mb-2">Welcome! Let's create your profile</h1>
        <p className="text-stone-700 mb-3">Let others get to know you better! You can do these later</p>
        <div className='font-semibold text-red-500 w-full h-[5vh]'>{error && <FontAwesomeIcon icon={faBan} className='mr-2' />}{error}</div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">Add an avatar</h2>
        <div className="mb-3 flex items-start md:justify-start justify-center gap-4">
          <img src={avatar || camera} className={`${!avatar && 'border-dashed border-2'} border-gray-300 rounded-full md:size-[15vw] w-32 h-32 mb-2 object-cover`} />
          <div className='space-y-6'>
            <input type='file' className='hidden' id='avatar' onChange={(e) => {
              setAvatar(URL.createObjectURL(e.target.files[0]));
              setAvatarPath(e.target.files[0]);
            }} />
            <label htmlFor='avatar' className='border-2 border-gray-200 rounded-lg p-2 text-gray-500 font-bold cursor-pointer hover:shadow-sm hover:border-gray-300'>
              Choose Image
            </label>
            <p className="text-gray-600">Or choose one of our defaults</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Add your location</h2>
          <Input
            placeholder="Enter a location"
            register={register}
            name='location'
            className="w-full px-4 py-2 border-b-2 shadow-none border-b-gray-300 rounded-none bg-inherit focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-[20%] p-0 h-[5vh] md:h-[7vh]"
          disabled={loader}
        >
          {loader ? <Spinner /> : 'Next'}
        </Button>
      </form>
    </Container>
  );
};

export default ProfileCreationPage;