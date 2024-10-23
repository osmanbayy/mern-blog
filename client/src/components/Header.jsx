import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { LuSun, LuMoon } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
      setSearchTerm('');
    }
    
  }, [location.search])

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!searchTerm || searchTerm === ''){
      return;
    }
    
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  const showSearch = () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.querySelector('.search-bar');
    const hiddenForm = document.querySelector('.hidden-form');

    searchIcon.addEventListener("click", () => {
      searchBar.classList.toggle('hidden');
      hiddenForm.classList.toggle('hidden');
    })
  }

  return (
    <Navbar className="relative border-b-2">
      <Link to={"/"} className="self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white">
        <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          oBay&apos;s
        </span>
        Blog
      </Link>

      <div className="flex items-center gap-2 md:order-2">
        <form onSubmit={handleSubmit}>
          <TextInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." rightIcon={IoSearchOutline} className="hidden sm:inline" />
        </form>
        <form onSubmit={handleSubmit} className="hidden sm:hidden hidden-form">
          <TextInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." rightIcon={IoSearchOutline} className="absolute z-10 hidden sm:hidden search-bar top-16 right-2" />
        </form>
        <IoSearchOutline onClick={showSearch} className="w-6 h-6 sm:hidden search-icon" />
        {
          theme === 'light' ? <LuMoon className="w-6 h-6" onClick={()=>dispatch(toggleTheme())}/> : <LuSun className="w-6 h-6" onClick={()=>dispatch(toggleTheme())}/>
        }
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
