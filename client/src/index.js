import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AvatarUploadPage, EmailVerificationPage, OptionsPage, SignupPage } from './pages/index.js';
import { store } from './store/store.js';
import { Provider } from "react-redux"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <SignupPage />
            },
            {
                path: '/avatar',
                element: <AvatarUploadPage />
            },
            {
                path: '/options',
                element: <OptionsPage />
            },
            {
                path: '/verifyEmail',
                element: <EmailVerificationPage />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
