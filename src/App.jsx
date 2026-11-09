import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";

import NotFoundPage from "./pages/NotFoundPage.jsx";
import Root from "./layout/Root";

import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";

import Deals from "./pages/Deals.jsx";
import NewArraivals from "./pages/NewArraivals.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/Deals",
				element: <Deals />,
			},
			{
				path: "/NewArrivals",
				element: <NewArraivals />,
			},
			{
				path: "/shop",
				element: <ShopPage />,
			},
			{
				path: "/product/:id",
				element: <ProductDetailsPage />,
			},
			{
				path: "/cart",
				element: <CartPage />,
			},
			{
				path: "/checkout",
				element: <CheckoutPage />,
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/signup",
				element: <SignupPage />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
