import React, { useRef } from 'react';
import Link from '@mui/material/Link';

function FileSelector({ children }) {
    const fileInputRef = useRef(null);

    const handleChooseFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', file); // Append the file to the FormData object

        fetch("http://localhost:4000/v1/upload", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("myToken")}`,
            },
            body: formData
        })
        .then(response => {
            // to handle response from backend

        })
        .catch(error => {

        });
    };

    return (
        <React.Fragment>
            <Link
                underline="always"
                component="button"
                onClick={handleChooseFileClick}
            >
                {children}
            </Link>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
            />
        </React.Fragment>
    );
}

export default FileSelector;
