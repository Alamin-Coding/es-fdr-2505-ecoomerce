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
    text: "Deals",
    link: "deals",
  },
  {
    id: uuidv4(),
    text: "New Arrivals",
    link: "newArrivals",
  },
  {
    id: uuidv4(),
    text: "Packages",
    link: "packages",
  },
  {
    id: uuidv4(),
    text: "Sign in",
    link: "login",
  },
];

const Navbar = () => {
  return (
    <nav className="pt-[72px] bg-[#FFFFFF]">
      <div className="container">
        <div className="flex justify-between gap-[345px] items-center">
          <Link to="/">
            <img src="/FASCO.svg" alt="LOGO" />
          </Link>
          <div>
            <ul className="flex justify-end gap-[58px] items-center">
              {menu?.map((item) => (
                <li
                  className="text-heading text-[16px] font-poppins leading-auto"
                  key={item.id}
                >
                  <Link to={item.link}>{item.text}</Link>
                </li>
              ))}
              <button className="common_button_black">Sign Up</button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
