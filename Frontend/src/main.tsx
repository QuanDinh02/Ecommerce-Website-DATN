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
import CategoryPage from '@/pages/Category/CategoryPage.tsx';
import ProductDetailPage from '@/pages/Product/ProductDetailPage.tsx';
import ShoppingCartPage from './pages/ShoppingCart/ShoppingCartPage.tsx';
import FavoriteProductPage from './pages/FavoriteProduct/FavoriteProductPage.tsx';
import PaymentPage from '@/pages/ShoppingCart/PaymentPage.tsx';
import SubCategoryPage from '@/pages/Category/SubCategoryPage.tsx';
import CustomerInfo from '@/pages/CustomerInfo/CustomerInfo.tsx';

//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

// REACT ROUTER DOM
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CustomerAccount from './pages/CustomerInfo/CustomerAccount.tsx';
import PasswordModification from './pages/CustomerInfo/CustomerAccount/PasswordModification.tsx';
import CustomerNotification from './pages/CustomerInfo/CustomerNotification.tsx';
import NotificationSetting from './pages/CustomerInfo/CustomerAccount/NotificationSetting.tsx';
import CustomerAddress from './pages/CustomerInfo/CustomerAddress.tsx';
import CustomerOrder from './pages/CustomerInfo/CustomerOrder.tsx';
import VoucherPage from './pages/CustomerInfo/VoucherPage.tsx';
import CustomerSupport from './pages/CustomerInfo/CustomerSupport.tsx';
import CustomerRoute from './components/CustomerRoute.tsx';
import AllOrder from './pages/CustomerInfo/CustomerOrder/AllOrder.tsx';
import PendingPaymentOrder from './pages/CustomerInfo/CustomerOrder/PendingPaymentOrder.tsx';
import PendingShippingOrder from './pages/CustomerInfo/CustomerOrder/PendingShippingOrder.tsx';
import CompletedShippingOrder from './pages/CustomerInfo/CustomerOrder/CompletedShippingOrder.tsx';
import CancelOrder from './pages/CustomerInfo/CustomerOrder/CancelOrder.tsx';
import ReturnOrder from './pages/CustomerInfo/CustomerOrder/ReturnOrder.tsx';
import ShippingOrder from './pages/CustomerInfo/CustomerOrder/ShippingOrder.tsx';
import CustomerAccountInfo from './pages/CustomerInfo/CustomerAccount/CustomerAccountInfo.tsx';

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
          path: "customer-info",
          element:
            <CustomerRoute>
              <CustomerInfo />
            </CustomerRoute>,
          children: [
            {
              path: "account",
              element: <CustomerAccount />,
              children: [
                {
                  path: "info",
                  element: <CustomerAccountInfo />
                },
                {
                  path: "password",
                  element: <PasswordModification />
                },
                {
                  path: "notification-setting",
                  element: <NotificationSetting />
                },
              ]
            },
            {
              path: "notification",
              element: <CustomerNotification />
            },
            {
              path: "address",
              element: <CustomerAddress />
            },
            {
              path: "order",
              element: <CustomerOrder />,
              children: [
                {
                  path: "all",
                  element: <AllOrder />,
                },
                {
                  path: "pending-payment",
                  element: <PendingPaymentOrder />,
                },
                {
                  path: "shipping",
                  element: <ShippingOrder />,
                },
                {
                  path: "pending-shipping",
                  element: <PendingShippingOrder />,
                },
                {
                  path: "completed-shipping",
                  element: <CompletedShippingOrder />,
                },
                {
                  path: "cancel",
                  element: <CancelOrder />,
                },
                {
                  path: "return",
                  element: <ReturnOrder />,
                },
              ]
            },
            {
              path: "voucher",
              element: <VoucherPage />
            },
            {
              path: "supports",
              element: <CustomerSupport />
            },
          ]
        },
        {
          path: "category",
          element: <CategoryPage />
        },
        {
          path: "sub-category",
          element: <SubCategoryPage />
        },
        {
          path: "product-detail",
          element: <ProductDetailPage />
        },
        {
          path: "cart",
          element: <ShoppingCartPage />
        },
        {
          path: "payment",
          element: <PaymentPage />
        },
        {
          path: "favorite-products",
          element: <FavoriteProductPage />
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "reset-password",
          element: <ForgotPasswordPage />
        },
      ],
    },
  ], {
  basename: import.meta.env.VITE_BASE_URL
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
