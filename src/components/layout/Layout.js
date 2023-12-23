// Layout.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa"; 
import Header from "./Header";
import Sidebar from "./Sidebar";
import Routers from "../../Routers/Routers";
import Breadcrumb from "../utils/Breadcrumb";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleToggle = () => {
    toggleSidebar();
  };

  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const shouldShowHeaderAndSidebar =
    location.pathname !== "/signin" &&
    location.pathname !== "/notfound" &&
    location.pathname !== "/signup";

  return (
    <div className={`app ${!sidebarVisible ? "sidebar-hidden" : ""}`}>
      {shouldShowHeaderAndSidebar && (
        <>
          <Header toggleSidebar={handleToggle} />
          {sidebarVisible && <Sidebar />}
        </>
      )}
      <main
        id="main"
        className={`${
          shouldShowHeaderAndSidebar ? (sidebarVisible ? "main" : "ml-0") : ""
        }`}
      >
        {shouldShowHeaderAndSidebar && (
          <div className="pagetitle">
            <h1>{pathnames.length > 0 ? pathnames : "Dashboard"}</h1>
            <nav>
              <ol className="breadcrumb">
                <Breadcrumb />
              </ol>
            </nav>
          </div>
        )}
        <Routers />
      </main>
      {shouldShowHeaderAndSidebar && <Footer />}
      {showBackToTop && (
  <div className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop}>
    <FaArrowUp />
  </div>
)}
    </div>
  );
};

export default Layout;
