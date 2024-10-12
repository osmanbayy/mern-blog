import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user);

  return (
    <Navbar className="border-b-2">
      <Link to={"/"} className="self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white">
        <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          oBay&apos;s
        </span>
        Blog
      </Link>

      <div className="flex items-center gap-2 md:order-2">
        <form>
          <TextInput type="text" placeholder="Search..." rightIcon={IoSearchOutline} className="hidden lg:inline" />
        </form>
        <Button className="flex items-center justify-center w-12 h-10 lg:hidden" color="gray" pill >
          <IoSearchOutline size={"18px"} />
        </Button>
        <Button className="items-center hidden w-12 h-10 sm:flex " color="gray" pill >
          <FaMoon size={"14px"} />
        </Button>
        {
          currentUser ? 
            <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
              <DropdownHeader>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              </DropdownHeader>
                <Link to={'/dashboard?tab=profile'}>
                  <DropdownItem>Profile</DropdownItem>
                </Link>
                <DropdownDivider />
                <DropdownItem>Sign Out</DropdownItem>
            </Dropdown> : 
            <Link to={"/sign-in"}>
              <Button gradientDuoTone="purpleToBlue" outline > Sign In </Button>
            </Link>
        }
        
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
