import { Link } from "react-router";
import { v4 as uuidv4 } from "uuid";

const menu = [
	{
		id: uuidv4(),
		text: "Home",
		link: "/",
	},
	{
		id: uuidv4(),
		text: "Shop",
		link: "shop",
	},
	{
		id: uuidv4(),
		text: "Deals",
		link: "deals",
	},
	{
		id: uuidv4(),
		text: "Sign in",
		link: "login",
	},
];

const Navbar = () => {
	return (
		<nav className="py-4 bg-slate-50">
			<div className="container">
				<div className="flex justify-between gap-6 items-center">
					<Link to="/">
						<img src="/logo.svg" alt="LOGO" />
					</Link>
					<ul className="flex justify-end gap-6 items-center">
						{menu?.map((item) => (
							<li className="" key={item.id}>
								<Link to={item.link}>{item.text}</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
