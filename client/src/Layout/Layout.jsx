import MyNavbar from "./MyNavbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  const [isScrolled, setIsScroll] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={700}
        theme="light"
      />
      <MyNavbar />
      <Outlet />
      <Footer />
    </>
  );
}