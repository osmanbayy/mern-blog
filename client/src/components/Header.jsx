import {Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2">
      <Link to={"/"} className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          oBay&apos;s
        </span>
        Blog
      </Link>

      <div className="flex gap-2 items-center md:order-2">
        <form>
          <TextInput type="text" placeholder="Search..." rightIcon={IoSearchOutline} className="hidden lg:inline" />
        </form>
        <Button className="w-12 h-10 flex items-center justify-center lg:hidden" color="gray" pill >
          <IoSearchOutline size={"18px"} />
        </Button>
        <Button className="w-12 h-10 hidden sm:flex items-center " color="gray" pill >
          <FaMoon size={"14px"} />
        </Button>
        <Link to={"/sign-in"}>
          <Button gradientDuoTone="purpleToBlue" pill> Sign In </Button>
        </Link>
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </NavbarLink>
        <NavbarLink active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </NavbarLink>
        <NavbarLink active={path === "/projects"} as={"div"}>
          <Link to={"/projects"}>Projects</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
