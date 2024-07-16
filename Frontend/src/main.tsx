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
import SearchPage from '@/pages/SearchPage.tsx';
import HistoryViewProductPage from '@/pages/HistoryViewProductPage.tsx';
import ShopPage from '@/pages/Product/ShopPage.tsx';

//CUSTOMER
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
import CustomerAccountInfo from '@/pages/CustomerInfo/CustomerAccount/CustomerAccountInfo.tsx';
import VoucherAll from '@/pages/CustomerInfo/Voucher/VoucherAll.tsx';
import VoucherHistory from '@/pages/CustomerInfo/Voucher/VoucherHistory.tsx';
import OrderTracking from '@/pages/CustomerInfo/CustomerOrder/OrderTracking.tsx';
import OrderRating from '@/pages/CustomerInfo/CustomerOrder/OrderItemRating/OrderRating.tsx';

//SELLER
import SellerInfo from '@/pages/SellerInfo/SellerInfo.tsx';
import SellerAllOrder from '@/pages/SellerInfo/SellerOrder/AllOrder.tsx';
import SellerOrder from '@/pages/SellerInfo/SellerOrder.tsx';
import SellerDashboard from '@/pages/SellerInfo/SellerDashboard.tsx';
import SellerProduct from '@/pages/SellerInfo/SellerProduct.tsx';
import SellerProductAll from '@/pages/SellerInfo/SellerProduct/SellerProductAll.tsx';
import SellerAddNewProduct from '@/pages/SellerInfo/SellerProduct/SellerAddNewProduct.tsx';
import SellerProfile from '@/pages/SellerInfo/SellerProfile.tsx';
import RegisterPage from '@/pages/RegisterPage.tsx';
import SellerSignUpPage from '@/pages/Register/SellerSignUpPage.tsx';
import ShopInfo from '@/pages/SellerInfo/Shop/ShopInfo.tsx';
import ShopManagement from '@/pages/SellerInfo/ShopManagement.tsx';
import OrderDetail from '@/pages/SellerInfo/SellerOrder/OrderDetail.tsx';
import SellerControlDelivery from '@/pages/SellerInfo/SellerControlDellivery.tsx';
import ShopCategory from '@/pages/SellerInfo/Shop/ShopCategory.tsx';
import SellerNotification from '@/pages/SellerInfo/SellerNotification.tsx';
import SellerSupport from '@/pages/SellerInfo/SellerSupport.tsx';
import SellerProductAnnouncement from '@/pages/SellerInfo/SellerProduct/SellerProductAnnouncement.tsx';
import ProductReviewManagement from '@/pages/SellerInfo/Shop/ProductReviewManagement.tsx';

// SHIPPING UNIT
import SUMain from '@/pages/ShippingUnit/SUMain.tsx';
import SUDashboard from '@/pages/ShippingUnit/SUDashboard.tsx';
import SUOrderManagement from '@/pages/ShippingUnit/SUOrderManagement.tsx';
import SUOrderStatus from '@/pages/ShippingUnit/SUOrderStatus.tsx';
import SUOrderDetail from '@/pages/ShippingUnit/SUOrderDetail.tsx';
import SUOrderReceipt from '@/pages/ShippingUnit/SUOrderReceipt.tsx';
import SUOrderShipping from '@/pages/ShippingUnit/SUOrderShipping.tsx';
import SUOrderComplete from '@/pages/ShippingUnit/SUOrderComplete.tsx';

// FoxMart Management System
import System from '@/pages/Management/System.tsx';
import SystemLogin from '@/pages/Management/SystemLogin.tsx';
import SystemMain from '@/pages/Management/SystemMain.tsx';
import SystemDashboard from '@/pages/Management/SystemDashboard.tsx';
import EmployeeManagement from '@/pages/Management/EmployeeManagement.tsx';
import CustomerManagement from '@/pages/Management/Partners/CustomerManagement.tsx';
import SellerManagement from '@/pages/Management/Partners/SellerManagement.tsx';
import DepartmentManagement from '@/pages/Management/DepartmentManagement.tsx';
import SystemPartner from '@/pages/Management/SystemPartner.tsx';
import ShippingUnitManagement from '@/pages/Management/Partners/ShippingUnitManagement.tsx';
import SystemProduct from '@/pages/Management/SystemProduct.tsx';
import SystemProductAnalysis from '@/pages/Management/SystemProductAnalysis.tsx';
import SUAddNew from '@/pages/Management/Partners/SUAddNew.tsx';

import AdminRoute from '@/components/AdminRoute.tsx';
import SellerRoute from '@/components/SellerRoute.tsx';
import CustomerRoute from '@/components/CustomerRoute.tsx';
import NewCustomer from '@/pages/NewCustomer.tsx';
import ShippingUnitRoute from '@/components/ShippingUnitRoute.tsx';
import ShopCategoryDetail from '@/pages/SellerInfo/Shop/ShopCategoryDetail.tsx';

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
                  path: "order-status",
                  element: <SellerAllOrder />,
                },
                {
                  path: "control-order-delivery",
                  element: <SellerControlDelivery />,
                }
              ]
            },
            {
              path: "order/detail",
              element: <OrderDetail />
            },
            {
              path: "notification",
              element: <SellerNotification />
            },
            {
              path: "supports",
              element: <SellerSupport/>
            },
            { path: "profile", element: <SellerProfile /> },
            {
              path: "shop", element: <ShopManagement />,
              children: [
                {
                  path: "info",
                  element: <ShopInfo />
                },
                {
                  path: "review",
                  element: <ProductReviewManagement/>
                },
                {
                  path: "category",
                  element: <ShopCategory />
                },
                {
                  path: "category/detail",
                  element: <ShopCategoryDetail />
                },
              ]
            },
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
                },
                {
                  path: "announce",
                  element: <SellerProductAnnouncement/>,
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
                  path: "status",
                  element: <AllOrder />,
                }
              ]
            },
            {
              path: "order/tracking-detail",
              element: <OrderTracking />,
            },
            {
              path: "order/rating",
              element: <OrderRating />,
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
          path: "search",
          element: <SearchPage />
        },
        {
          path: "category",
          element: <CategoryPage />
        },
        {
          path: "history",
          element: <HistoryViewProductPage />
        },
        {
          path: "sub-category",
          element: <SubCategoryPage />
        },
        {
          path: "product",
          element: <ProductDetailPage />
        },
        {
          path: "shop",
          element: <ShopPage />
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
          element:
            <CustomerRoute>
              <PaymentPage />
            </CustomerRoute>
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
            {
              path: "seller",
              element: <SellerSignUpPage />
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
    {
      path: "/fms",
      element: <System />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "admin",
          element:
            <AdminRoute>
              <SystemMain />
            </AdminRoute>
          ,
          children: [
            {
              path: "dashboard",
              element: <SystemDashboard />
            },
            {
              path: "product",
              element: <SystemProduct />,
              children: [
                {
                  path: "analysis",
                  element: <SystemProductAnalysis />
                }
              ]
            },
            {
              path: "employee",
              element: <EmployeeManagement />
            },
            {
              path: "partner",
              element: <SystemPartner />,
              children: [
                {
                  path: "customer",
                  element: <CustomerManagement />
                },
                {
                  path: "seller",
                  element: <SellerManagement />
                },
                {
                  path: "shipping_unit",
                  element: <ShippingUnitManagement />
                },
                {
                  path: "shipping_unit/new",
                  element: <SUAddNew />,
                }
              ]
            },
            {
              path: "department",
              element: <DepartmentManagement />
            }
          ]
        },
        {
          path: "su",
          element:
            <ShippingUnitRoute>
              <SUMain />
            </ShippingUnitRoute>
          ,
          children: [
            {
              path: "dashboard",
              element: <SUDashboard />
            },
            {
              path: "order",
              element: <SUOrderManagement />,
              children: [
                {
                  path: "order-status",
                  element: <SUOrderStatus />,
                },
                {
                  path: "order-receipt",
                  element: <SUOrderReceipt />,
                },
                {
                  path: "order-shipping",
                  element: <SUOrderShipping />,
                },
                {
                  path: "order-complete",
                  element: <SUOrderComplete />,
                },
                {
                  path: "detail",
                  element: <SUOrderDetail />
                },
              ]
            },
          ]
        },
      ]
    },
    {
      path: "/new-customer",
      element: <NewCustomer />
    },
    {
      path: "/fms/login",
      element: <SystemLogin />,
      errorElement: <ErrorPage />
    }
  ], {
  basename: import.meta.env.VITE_BASE_URL
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
