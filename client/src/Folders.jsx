import { makeRequest } from './utils/make_request'
import { useEffect, useState } from 'react'

function Folders(props) {
    const {
        button
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
                <a href={`folder/${folder.id}/`} key={index} className="folder">{folder.title}</a>
            ));
            setOld(updatedFolders);
        });
    }, [button]);


    return (
        <>
            {old}
        </>
    )
}

export default Folders;