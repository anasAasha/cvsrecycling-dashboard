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
import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                    <RxDashboard size={'1.2rem'}  />
                            <span className='ps-2'>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-heading">Pages</li>
                <li className="nav-item">
                    <Link to="/items" className="nav-link collapsed" >
                    <TbSettingsStar size={'1.2rem'} />
                            <span className='ps-2'>Items</span>  
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/drivers"  className="nav-link collapsed">
                        <CiDeliveryTruck size={'1.2rem'} />
                            <span className='ps-2'>Drivers</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/mechanics" className="nav-link collapsed" >
                        <GiMechanicGarage size={'1.2rem'} />
                            <span className='ps-2'>Mechanics</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/order" className="nav-link collapsed" >
                        <BiGitPullRequest size={'1.2rem'} />
                            <span className='ps-2'>Order</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/invoices" className="nav-link collapsed" >
                        <TbReceipt  size={'1.2rem'} />
                       

                            <span className='ps-2'>Invoices</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/store" className="nav-link collapsed" >
                        <MdOutlineStoreMallDirectory size={'1.2rem'} />
                            <span className='ps-2'>Stores</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/setting" className="nav-link collapsed" >
                        <AiFillSetting size={'1.2rem'} />
                            <span className='ps-2'>Setting</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link collapsed" >
                        <FaComment  size={'1.2rem'} />
                            <span className='ps-2'>Chat</span>
                    </Link>
                </li>
              
                <li className="nav-heading">Website</li>
                <li className="nav-item">
                    <Link to="/Website" className="nav-link collapsed" >
                        <CgWebsite size={'1.2rem'} />
                            <span className='ps-2'>Website CVS</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;