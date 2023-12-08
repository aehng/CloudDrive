import { useState } from 'react'
import logo from './assets/Logo.png'
import './App.css'
import { makeRequest } from './utils/make_request'
import FileUploadForm from './UploadForm'
import FileDownloadForm from './DownloadForm'
import Folders from './Folders'
import Files from './Files'
import { useParams } from 'react-router-dom';

function App() {
  const [title, setTitle] = useState("")
  const [button, setButton] = useState("")
  const [upload, setUpload] = useState("")

  let { id } = useParams();
  if (!id){
    id = 0
  }

  async function postFolder(e) {
    await makeRequest("/folders/", "post", { title }).then(response => {
      setTitle('')
      setButton(response)
    })
  }

  return (
    <>
      <div className='flex'>
        <div className='folders-section'>
          <Folders button={button} />
          <span className='flex'>
          <input className='folder-text' placeholder='Create Folder' type="text" value={title} onChange={e => setTitle(e.target.value)} />
            <button className='folder-button' onClick={() => postFolder()}>Create</button>
          </span>
        </div>
        <div className='content'>
          <Files folder_id={id} upload={upload} />
          <FileUploadForm setUpload={setUpload} folder_id={id} />
        </div>
      </div>
    </>
  )
}

export default App;
