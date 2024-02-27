import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss';
import Technologies from '@/pages/Reference/Technologies.tsx';
import ReduxTesting from '@/pages/Reference/ReduxTesting.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import ReferencePage from '@/pages/Reference.tsx';
import Homepage from '@/pages/Homepage.tsx';
import RegisterPage from '@/pages/RegisterPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.tsx';

//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

// REACT ROUTER DOM
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Homepage /> },
        {
          path: "reference",
          element: <ReferencePage />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "technologies",
              element: <Technologies />
            },
            {
              path: "redux-testing",
              element: <ReduxTesting />
            },
          ]
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "login",
          element: <LoginPage/>,
        },
        {
          path: "reset",
          element: <ForgotPasswordPage/>
        },
      ],
    }, 
  ], {
  basename: import.meta.env.VITE_BASE_URL
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
