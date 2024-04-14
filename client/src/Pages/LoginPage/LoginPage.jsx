/* eslint-disable no-prototype-builtins */
// redux
// import { useDispatch, useSelector } from "react-redux";
// import { cartAction } from "../../store/store";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/context";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const { setUser } = useUserContext();
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.result !== undefined) {
      setIsLogin((prevState) => !prevState);
    }

    if (actionData?.user !== undefined) {
      setUser(() => actionData.user);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  // const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart);

  // signUp handle

  return (
    <>
      <div
        id="homepage_banner"
        className="d-flex flex-column align-items-start justify-content-center"
      >
        <div id="authForm">
          <h3>{isLogin ? "Sign In" : "Sign Up"}</h3>
          <Form method="POST" className="h-auto d-flex flex-column">
            <div className="formContainer">
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Username"
              />

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                minLength={8}
              />

              {!isLogin && (
                <>
                  <input
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                  />

                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />

                  <input
                    type="tel"
                    id="phone"
                    name="phoneNumber"
                    placeholder="Phone"
                  />
                </>
              )}
            </div>

            <input
              className="bg-dark mb-2 text-white"
              type="submit"
              name="intent"
              value={isLogin ? "login" : "signup"}
            />
          </Form>

          {isLogin ? (
            <p>
              Tạo tài khoản?{" "}
              <span onClick={() => setIsLogin((prevState) => !prevState)}>
                Tài Khoản
              </span>
            </p>
          ) : (
            <p>
              Bạn đã có tài khoảng?{" "}
              <span onClick={() => setIsLogin((prevState) => !prevState)}>
                Đăng nhập
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}