import { makeRequest } from './utils/make_request'
import { useEffect, useState } from 'react'

function Folders(props) {
    const {
        title
    } = props;

    const [old, setOld] = useState([]);


    async function getFolders() {
        const folders = await makeRequest("/folders/")
        return folders
    }

    useEffect(() => {
        // I got some AI help here too... mostly just parsing the object
    getFolders().then(response => {
        const folders = response.folders;
        const updatedFolders = folders.map((folder, index) => (
            <div key={index} className="folder">{folder.title}</div>
          ));
          setOld(updatedFolders);
        });
}, [title]);


    return (
        <>
            <div className='folders-section'>
                {old}
            </div>
        </>
    )
}

export default Folders;