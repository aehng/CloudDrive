import { Outlet } from "react-router-dom";
import logo from './assets/Logo.png'
import { Link } from "react-router-dom";


function Frame() {

    async function logout() {
        const res = await fetch("/registration/logout/", {
          credentials: "same-origin", // include cookies!
        });
        window.location.reload();
      }

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <Link href="/" >
                    <img src={logo} className="logo" alt="Cloud Drive logo" />
                </Link>
                <div className="flex-center">
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Frame