import { useState } from 'react'
import logo from './assets/Logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });
  }
  async function get_folders() {
    const res = await fetch("/folders/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
      <nav class="navbar bg-body-tertiary">
        <a href="/" target="_blank">
          <img src={logo} className="logo" alt="Cloud Drive logo" />
        </a>
        <div class="flex-center">
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <div>
        <button onClick={() => fetch("/folders/", {
      credentials: "same-origin", method: "POST", // include cookies!
    })}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App;
