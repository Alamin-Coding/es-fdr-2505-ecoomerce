import React from "react";
import { Link } from "react-router";

const Footer = () => {
	return (
		<footer>
			<div className="container">
				<div className="flex items-center justify-between gap-6">
					<Link to="/">
						<img src="/logo.svg" alt="logo" />
					</Link>
					<ul className="flex items-center gap-3">
						<li>
							<Link to="/">Support Center</Link>
						</li>
						<li>
							<Link to="/">Invoicing</Link>
						</li>
						<li>
							<Link to="/">Contract</Link>
						</li>
						<li>
							<Link to="/">Careers</Link>
						</li>
						<li>
							<Link to="/">Blog</Link>
						</li>
						<li>
							<Link to="/">FAQ,s</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
