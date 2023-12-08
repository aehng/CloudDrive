import { useState } from 'react'
import logo from './assets/Logo.png'
import './App.css'
import { makeRequest } from './utils/make_request'
import FileUploadForm from './UploadForm'
import FileDownloadForm from './DownloadForm'
import Folders from './Folders'

function App() {
  const [title, setTitle] = useState("")
  const [button, setButton] = useState("")

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
    await makeRequest("/folders/", "post", { title }).then(response => {
      setTitle('')
      setButton(response)
    })
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
      <div className='page'>
        <div className='folders-section'>
          <Folders button={button} />
          <div>
          <input className='folder-text' placeholder='Add Folder' type="text" value={title} onChange={e => setTitle(e.target.value)} />
            <button className='folder-button' onClick={() => postFolder()}>Post</button>
          </div>
        </div>
        <div className='content'>
          <FileUploadForm />
          <FileDownloadForm />
        </div>
      </div>
    </>
  )
}

export default App;
