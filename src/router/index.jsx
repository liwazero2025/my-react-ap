/**
 * @prettier
 */
import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import IndexPage from '../pages/IndexPage/index';

const router = createBrowserRouter([
    {
        path: '/',
        element: <IndexPage />,
        index: true
    }
]);
const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
