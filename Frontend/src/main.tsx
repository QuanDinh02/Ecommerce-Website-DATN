import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss';

import Technologies from '@/pages/Reference/Technologies.tsx';
import ReduxTesting from '@/pages/Reference/ReduxTesting.tsx';
import ReferencePage from '@/pages/Reference.tsx';

import ErrorPage from '@/pages/ErrorPage.tsx';

import Homepage from '@/pages/Homepage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.tsx';
import SelectUserRolePage from '@/pages/Register/SelectUserRolePage.tsx';
import CustomerSignUpPage from '@/pages/Register/CustomerSignUpPage.tsx';

import CategoryPage from '@/pages/Category/CategoryPage.tsx';
import ProductDetailPage from '@/pages/Product/ProductDetailPage.tsx';
import ShoppingCartPage from './pages/ShoppingCart/ShoppingCartPage.tsx';
import FavoriteProductPage from './pages/FavoriteProduct/FavoriteProductPage.tsx';
import PaymentPage from '@/pages/ShoppingCart/PaymentPage.tsx';
import SubCategoryPage from '@/pages/Category/SubCategoryPage.tsx';

import CustomerInfo from '@/pages/CustomerInfo/CustomerInfo.tsx';
import CustomerAccount from '@/pages/CustomerInfo/CustomerAccount.tsx';
import PasswordModification from '@/pages/CustomerInfo/CustomerAccount/PasswordModification.tsx';
import CustomerNotification from '@/pages/CustomerInfo/CustomerNotification.tsx';
import NotificationSetting from '@/pages/CustomerInfo/CustomerAccount/NotificationSetting.tsx';
import CustomerAddress from '@/pages/CustomerInfo/CustomerAddress.tsx';
import CustomerOrder from '@/pages/CustomerInfo/CustomerOrder.tsx';
import VoucherPage from '@/pages/CustomerInfo/VoucherPage.tsx';
import CustomerSupport from '@/pages/CustomerInfo/CustomerSupport.tsx';
import AllOrder from '@/pages/CustomerInfo/CustomerOrder/AllOrder.tsx';
import PendingPaymentOrder from '@/pages/CustomerInfo/CustomerOrder/PendingPaymentOrder.tsx';
import PendingShippingOrder from '@/pages/CustomerInfo/CustomerOrder/PendingShippingOrder.tsx';
import CompletedShippingOrder from '@/pages/CustomerInfo/CustomerOrder/CompletedShippingOrder.tsx';
import CancelOrder from '@/pages/CustomerInfo/CustomerOrder/CancelOrder.tsx';
import ReturnOrder from '@/pages/CustomerInfo/CustomerOrder/ReturnOrder.tsx';
import ShippingOrder from '@/pages/CustomerInfo/CustomerOrder/ShippingOrder.tsx';
import CustomerAccountInfo from '@/pages/CustomerInfo/CustomerAccount/CustomerAccountInfo.tsx';
import VoucherAll from '@/pages/CustomerInfo/Voucher/VoucherAll.tsx';
import VoucherHistory from '@/pages/CustomerInfo/Voucher/VoucherHistory.tsx';

import SellerInfo from '@/pages/SellerInfo/SellerInfo.tsx';
import SellerAllOrder from '@/pages/SellerInfo/SellerOrder/AllOrder.tsx';
import SellerPendingPaymentOrder from '@/pages/SellerInfo/SellerOrder/PendingPaymentOrder.tsx';
import SellerPendingShippingOrder from '@/pages/SellerInfo/SellerOrder/PendingShippingOrder.tsx';
import SellerCompletedShippingOrder from '@/pages/SellerInfo/SellerOrder/CompletedShippingOrder.tsx';
import SellerCancelOrder from '@/pages/SellerInfo/SellerOrder/CancelOrder.tsx';
import SellerReturnOrder from '@/pages/SellerInfo/SellerOrder/ReturnOrder.tsx';
import SellerShippingOrder from '@/pages/SellerInfo/SellerOrder/ShippingOrder.tsx';
import SellerOrder from '@/pages/SellerInfo/SellerOrder.tsx';
import SellerDashboard from '@/pages/SellerInfo/SellerDashboard.tsx';
import SellerProduct from '@/pages/SellerInfo/SellerProduct.tsx';
import SellerProductAll from '@/pages/SellerInfo/SellerProduct/SellerProductAll.tsx';
import SellerAddNewProduct from '@/pages/SellerInfo/SellerProduct/SellerAddNewProduct.tsx';
import SellerProfile from '@/pages/SellerInfo/SellerProfile.tsx';

import SellerRoute from '@/components/SellerRoute.tsx';
import CustomerRoute from '@/components/CustomerRoute.tsx';

//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

// REACT ROUTER DOM
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from './pages/RegisterPage.tsx';

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
          path: "seller-info",
          element:
            <SellerRoute>
              <SellerInfo />
            </SellerRoute>,
          children: [
            { path: "dashboard", element: <SellerDashboard /> },
            {
              path: "order",
              element: <SellerOrder />,
              children: [
                {
                  path: "all",
                  element: <SellerAllOrder />,
                },
                {
                  path: "pending-payment",
                  element: <SellerPendingPaymentOrder />,
                },
                {
                  path: "shipping",
                  element: <SellerShippingOrder />,
                },
                {
                  path: "pending-shipping",
                  element: <SellerPendingShippingOrder />,
                },
                {
                  path: "completed-shipping",
                  element: <SellerCompletedShippingOrder />,
                },
                {
                  path: "cancel",
                  element: <SellerCancelOrder />,
                },
                {
                  path: "return",
                  element: <SellerReturnOrder />,
                },
              ]
            },
            { path: "profile", element: <SellerProfile /> },
            {
              path: "product",
              element: <SellerProduct />,
              children: [
                {
                  path: "all",
                  element: <SellerProductAll />,
                },
                {
                  path: "new",
                  element: <SellerAddNewProduct />,
                }
              ]
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
              element: <VoucherPage />,
              children: [
                {
                  path: "info",
                  element: <VoucherAll />,
                },
                {
                  path: "history",
                  element: <VoucherHistory />,
                },
              ]
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
          element:
            <CustomerRoute>
              <ShoppingCartPage />
            </CustomerRoute>
        },
        {
          path: "payment",
          element: <PaymentPage />
        },
        {
          path: "favorite-products",
          element:
            <CustomerRoute>
              <FavoriteProductPage />
            </CustomerRoute>
        },
        {
          path: "register",
          element: <RegisterPage />,
          children: [
            {
              index: true,
              element: <SelectUserRolePage />
            },
            {
              path: "customer",
              element: <CustomerSignUpPage />
            },
          ]
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
