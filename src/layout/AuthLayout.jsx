import { Outlet } from "react-router";
import AuthNavbar from "../components/auth/AuthNavbar";

const AuthLayout = () => {

	return (
		<>
			<AuthNavbar />
			<Outlet />
		</>
	);
};

export default AuthLayout;
