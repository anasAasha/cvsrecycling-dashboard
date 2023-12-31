import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import { Button, Dropdown } from "react-bootstrap";
import { MdRecycling } from "react-icons/md";
import {
  BsPerson,
  BsGear,
  BsQuestionCircle,
  BsBoxArrowRight,
} from "react-icons/bs";
import { Link, Navigate } from "react-router-dom";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
function Header({ toggleSidebar }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(`Logged out successfully. Goodbye!`);
      // toast.success(`Logged out successfully. Goodbye, ${user.username}!`);
      return <Navigate to="/signin" />;
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };

  return (
    <header
      id="header"
      className={`header fixed-top d-flex align-items-center ${
        isFullScreen ? "fullscreen" : ""
      }`}
    >
      <div className="d-flex align-items-center justify-content-between">
        <Link className="logo d-flex align-items-center" to="/">
          <MdRecycling color="#1E8449" size={"2.5rem"} />
          <span className="d-none d-lg-block ps-2">CVS Recycling</span>
        </Link>
        <BsList className="toggle-sidebar-btn" onClick={toggleSidebar} />
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <Dropdown className="nav-item dropdown pe-3">
            <Dropdown.Toggle
              as="a"
              className="nav-link nav-profile d-flex align-items-center pe-0"
              data-bs-toggle="dropdown"
            >
              <BsPerson />
              <span className="d-none d-md-block  ps-2">
                CVS Recycling Admin
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>CVS Recycling</h6>
                <span>Dashboard</span>
              </li>
              <Dropdown.Item>
                <Link
                  to="/setting"
                  className="dropdown-item d-flex align-items-center"
                >
                  <BsGear />
                  <span className="ps-2">Settings</span>
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Link
                  to="/needHelp"
                  className="dropdown-item d-flex align-items-center"
                >
                  <BsQuestionCircle />
                  <span className="ps-2">Need Help?</span>
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button
                  className="dropdown-item d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <BsBoxArrowRight />
                  <span className="ps-2">Sign Out</span>
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <li className="nav-item">
            <button
              className="nav-link nav-icon"
              onClick={toggleFullScreen}
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullScreen ? <BiExitFullscreen /> : <BiFullscreen />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
