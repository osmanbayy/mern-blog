import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { LuSun, LuMoon } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { signoutSuccess } from "../redux/user/userSlice.js";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);

  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const response = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await response.json();
      if(!response.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        window.location.href = '/sign-in'; // Redirect to homepage after signout
      }
      
    } catch (error) {
      console.error("Sign Out Error", error);
    }
  }

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
        <Button className="items-center hidden w-12 h-10 border-none outline-none sm:flex" color="gray" pill onClick={()=>dispatch(toggleTheme())} >
          {
            theme === 'light' ? <LuMoon size={"18px"} /> : <LuSun size={'18px'} />
          }
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
                <DropdownItem onClick={handleSignout}>Sign Out</DropdownItem>
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
