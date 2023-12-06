import { useState } from 'react'
import logo from './assets/Logo.png'
import './App.css'
import { makeRequest } from './utils/make_request'

function App() {
  const [title, setTitle] = useState("")

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
  async function postFolder(e) {
    console.log(title)
    const res = await makeRequest("/folders/", "post", {title})
    if (res) {
      console.log(res)
    }
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <a href="/" target="_blank">
          <img src={logo} className="logo" alt="Cloud Drive logo" />
        </a>
        <div className="flex-center">
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <label>
            Title
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
      </label>
      <div>
        <button onClick={() => postFolder()}>Post</button>
      </div>
    </>
  )
}

export default App;
