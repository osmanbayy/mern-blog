import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {

    const location = useLocation();
    const [tab, setTab] = useState("");
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get("tab");
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);
  
    
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
            <Link to='/dashboard?tab=profile'>
            <SidebarItem as="div" className="cursor-pointer" active={tab === 'profile'} icon={FaUser} label={'User'} labelColor='dark'>Profile</SidebarItem>
            </Link>
            <SidebarItem as="div" className="cursor-pointer" icon={FaSignOutAlt} labelColor='dark'>Sign Out</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}
