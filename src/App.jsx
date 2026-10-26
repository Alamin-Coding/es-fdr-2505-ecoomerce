import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ShopPage from "./pages/ShopPage";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Root from "./layout/Root";
import ProductPage from "./pages/ProductPage.jsx";

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
				path: "/shop",
				element: <ShopPage />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/signup",
				element: <SignupPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
			{
				path: "/product/:id",
				element: <ProductPage />,
			}
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
