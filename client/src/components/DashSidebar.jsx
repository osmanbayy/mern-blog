import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosDocument } from "react-icons/io";

export default function DashSidebar() {

    const { currentUser } = useSelector((state) => state.user);

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
        <SidebarItemGroup className="flex flex-col gap-1">
            <Link to='/dashboard?tab=profile'>
              <SidebarItem as="div" className="cursor-pointer" active={tab === 'profile'} icon={FaUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark'>Profile</SidebarItem>
            </Link>
            {
              currentUser.isAdmin && (
                <Link to='/dashboard?tab=posts'>
                  <SidebarItem as="div" className="cursor-pointer" active={tab === 'posts'} icon={IoIosDocument}>Posts</SidebarItem>
                </Link>
              )
            }
            <SidebarItem onClick={handleSignout} className="cursor-pointer" icon={FaSignOutAlt} labelColor='dark'>Sign Out</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}
