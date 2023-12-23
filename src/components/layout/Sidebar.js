import React from 'react';
import { MdOutlineStoreMallDirectory } from 'react-icons/md';
import { BiGitPullRequest } from 'react-icons/bi';
import { CiDeliveryTruck } from 'react-icons/ci';
import { GiMechanicGarage } from 'react-icons/gi';
import { TbReceipt, TbSettingsStar } from 'react-icons/tb';
import { CgWebsite } from 'react-icons/cg';
import { RxDashboard } from 'react-icons/rx';
import { AiFillSetting } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import SidebarItem from '../common/reuseable/SidebarItem';
function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <SidebarItem to="/" icon={<RxDashboard size={'1.2rem'} />} text="Dashboard" />
                <li className="nav-heading">Pages</li>
                <SidebarItem to="/items" icon={<TbSettingsStar size={'1.2rem'} />} text="Items" />
                <SidebarItem to="/drivers" icon={<CiDeliveryTruck size={'1.2rem'} />} text="Drivers" />
                <SidebarItem to="/mechanics" icon={<GiMechanicGarage size={'1.2rem'} />} text="Mechanics" />
                <SidebarItem to="/order" icon={<BiGitPullRequest size={'1.2rem'} />} text="Order" />
                <SidebarItem to="/invoices" icon={<TbReceipt size={'1.2rem'} />} text="Invoices" />
                <SidebarItem to="/store" icon={<MdOutlineStoreMallDirectory size={'1.2rem'} />} text="Stores" />
                <SidebarItem to="/setting" icon={<AiFillSetting size={'1.2rem'} />} text="Setting" />
                <SidebarItem to="/contact" icon={<FaComment size={'1.2rem'} />} text="Chat" />              
                <li className="nav-heading">Website</li>
                <SidebarItem to="/Website" icon={<CgWebsite size={'1.2rem'} />} text="Website CVS" />   
            </ul>
        </aside>
    );
}

export default Sidebar;