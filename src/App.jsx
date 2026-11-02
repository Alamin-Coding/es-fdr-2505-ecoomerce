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
				path: "/signup",
				element: <SignupPage />,
			},
			{
				path: "/shop",
				element: <ShopPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
			{
				path: "/product/:id",
				element: <ProductDetailsPage />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
