import { Link } from "react-router";
import { v4 as uuidv4 } from "uuid";

const menu = [
  {
    id: uuidv4(),
    text: "Support Center",
    link: "support center",
  },
  {
    id: uuidv4(),
    text: "Invoicing",
    link: "invoicing",
  },
  {
    id: uuidv4(),
    text: "Contract",
    link: "contract",
  },
  {
    id: uuidv4(),
    text: "Careers",
    link: "careers",
  },
  {
    id: uuidv4(),
    text: "Blog",
    link: "blog",
  },
  {
    id: uuidv4(),
    text: "FAQ,s",
    link: "faq,s",
  },
];

const Footer = () => {
  return (
    <footer className="mt-7.5 mb-5.75">
      <div className="container">
        <div className="flex items-center justify-between gap-[577px]">
          <Link to="/">
            <img src="/FooterLogo.svg" alt="logo" />
          </Link>
          <div>
            <ul className="flex justify-end gap-[38px] items-center">
              {menu?.map((item) => (
                <li
                  className="text-heading text-[16px] font-poppins leading-auto"
                  key={item.id}
                >
                  <Link to={item.link}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="pt-[50px] text-3 text-[#484848] font-poppins leading-[26px] text-center">
          Copyright © 2022 Xpro . All Rights Reseved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
