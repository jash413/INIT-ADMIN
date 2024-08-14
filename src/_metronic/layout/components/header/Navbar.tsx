import { useState } from "react";
import clsx from "clsx";
import { toAbsoluteUrl } from "../../../helpers";
import { HeaderUserMenu, ThemeModeSwitcher } from "../../../partials";
import { useAuth } from "../../../../app/modules/auth/core/Auth";

const itemClass = "ms-1 ms-md-4";
const userAvatarClass = "symbol-35px";

const Navbar = () => {
  const { auth, saveAuth } = useAuth();
  const [loginType, setLoginType] = useState(auth?.loginType);

  const handleLoginTypeChange = (newLoginType: string) => {
    setLoginType(newLoginType);
    if (!auth) {
      return;
    }
    saveAuth({
      accessToken: auth.accessToken,
      loginType: newLoginType,
    });
  };

  return (
    <div className="app-navbar flex-shrink-0">
      <div className={clsx("app-navbar-item", itemClass)}>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="loginTypeDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Login Type: {loginType}
          </button>
          <ul className="dropdown-menu" aria-labelledby="loginTypeDropdown">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleLoginTypeChange("IFAS")}
              >
                IFAS APP SUBSCRIPTIONS
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleLoginTypeChange("API")}
              >
                API SUBSCRIPTIONS
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={clsx("app-navbar-item", itemClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx("btn-active-light-primary btn-custom")}
        />
      </div>

      <div className={clsx("app-navbar-item", itemClass)}>
        <div
          className={clsx("cursor-pointer symbol", userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          <img src={toAbsoluteUrl("media/avatars/300-3.jpg")} alt="" />
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  );
};

export { Navbar };
