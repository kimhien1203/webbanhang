import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserContext } from "../Context/context";

export default function MyNavbar() {
  // !!! NavLink from "react-router-dom" NOT from"react-bootstrap"
  // const currentUser = useContext(Curre)
  // eslint-disable-next-line no-unused-vars

  const [isScrolled, setIsScroll] = useState(false);
  const { user, setUser } = useUserContext();

  const logOut = async () => {
    const res = await fetch("http://localhost:5000/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      setUser(null);
    }
  };

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
    <Navbar
      className={`fw-bold ${isScrolled ? "isScrolled" : null}`}
      sticky="top"
      expand="lg"
    >
      <Container>
        <Row className="g-0 align-items-center w-100">
          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active pe-5 nav-link" : "pe-5 nav-link"
                }
                style={({ isActive }) => {
                  return {
                    color: isActive && "#dfb44f",
                  };
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "nav-link"
                }
                style={({ isActive }) => {
                  return {
                    color: isActive && "#dfb44f",
                  };
                }}
              >
                Shop
              </NavLink>
            </Navbar.Collapse>
          </Col>
          <Col className="d-flex justify-content-center">
            <Navbar.Brand className="fs-4">
              Shop D2H
            </Navbar.Brand>
          </Col>
          <Col className="flex-row justify-content-end navbar-nav">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
              style={({ isActive }) => {
                return {
                  color: isActive && "#dfb44f",
                };
              }}
            >
              <div className="d-flex align-items-center flex-row pe-5">
                <i className="fa-solid fa-cart-shopping pe-1"></i>
                <p className="d-none d-md-block">Cart</p>
              </div>
            </NavLink>

            {user !== null && (
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive ? "active ps-4  nav-link " : "ps-4 nav-link "
                }
                style={({ isActive }) => {
                  return {
                    color: isActive && "#dfb44f",
                  };
                }}
              >
                History
              </NavLink>
            )}

            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active ps-4 nav-link " : "ps-4 nav-link "
              }
              style={({ isActive }) => {
                return {
                  color: isActive && "#dfb44f",
                };
              }}
            >
              <div className="d-flex  align-items-center flex-row ">
                {user === null ? (
                  <>
                    <i className="fa-solid fa-user pe-1"></i>
                    <p className="d-none d-md-block">Login</p>
                  </>
                ) : (
                  <>
                    <p className="d-none d-md-block">{user.userName},</p>
                    <i
                      style={{ color: "#dfb44f" }}
                      className="fa-solid fa-arrow-right-from-bracket icon-logout"
                      onClick={logOut}
                    ></i>
                  </>
                )}
              </div>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}