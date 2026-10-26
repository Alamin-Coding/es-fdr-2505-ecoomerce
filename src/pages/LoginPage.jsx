import { Bounce, toast } from "react-toastify";

const LoginPage = () => {
	const notify = () =>
		toast.success("Successfully login", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			transition: Bounce,
		});
	return (
		<div>
			LoginPage
			<button
				onClick={notify}
				className="common_button_black"
			>
				Login
			</button>
		</div>
	);
};

export default LoginPage;
