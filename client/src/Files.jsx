import { makeRequest } from './utils/make_request'
import { useEffect, useState } from 'react'
import FileDownloadForm from './DownloadForm';

function Files(props) {
    const {
        folder_id
    } = props;

    const [old, setOld] = useState([]);


    async function getFiles() {
        const files = await makeRequest(`/files/${folder_id}/`)
        return files
    }

    useEffect(() => {
        // I got some AI help here too... mostly just parsing the object
        getFiles().then(response => {
            const files = response.files;
            console.log(files)
            const updatedfiles = files.map((file, index) => (
                <div className="file" key={index}>
                    {file['name']}
                    <FileDownloadForm file_id={file['id']} />
                </div>
            ));
            setOld(updatedfiles);
        });
    }, [folder_id]);


    return (
        <>
            {old}
        </>
    )
}

export default Files;