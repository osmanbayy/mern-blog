import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashSidebar() {

    const location = useLocation();
    const [tab, setTab] = useState("");

    const dispatch = useDispatch();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get("tab");
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);

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
        }
        
      } catch (error) {
        console.error("Sign Out Error", error);
      }
    }
  
    
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
            <Link to='/dashboard?tab=profile'>
            <SidebarItem as="div" className="cursor-pointer" active={tab === 'profile'} icon={FaUser} label={'User'} labelColor='dark'>Profile</SidebarItem>
            </Link>
            <SidebarItem onClick={handleSignout} className="cursor-pointer" icon={FaSignOutAlt} labelColor='dark'>Sign Out</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}
