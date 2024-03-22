import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Country from './pages/Country.jsx'
import NotFound from './pages/NotFound.jsx';
import { Provider } from 'react-redux'
import {store} from './redux/storage.js';

const mainRoute = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />
    },
    {
        path: 'Country/:countryName',
        element: <Country />
    }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={mainRoute} />
    </Provider>
)
