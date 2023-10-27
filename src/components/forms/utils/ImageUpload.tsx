import React, {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useState,
    MouseEvent,
} from "react"

import { DragUploadButton, PreviewImg } from "../../../styles/components/forms.style"
import { useDropzone } from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner, faSquarePlus, faUpload } from "@fortawesome/free-solid-svg-icons"

interface ComponentProps {
	formData: any
	setFormData: Dispatch<SetStateAction<any>>
	defaultImage: string
    label: string
    isCircle?: boolean
}

function ImageUpload({
	formData,
	setFormData,
	defaultImage,
    label,
    isCircle,
}: PropsWithChildren<ComponentProps>) {
    // constants
    const apiKey: string = process.env.REACT_APP_CLOUDINARY_API_KEY || ""
    const apiUrl: string = process.env.REACT_APP_CLOUDINARY_API_URL || ""
	// state
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

	// callbacks
	const onDrop = useCallback((files: File[]) => {
        // uploads a file to cloudinary
        async function uploadFile(file: File) {
            const fileData = new FormData()
            fileData.append("file", file)
            fileData.append("upload_preset", "test-vowsuite-uploads-unsigned")
            fileData.append("api_key", apiKey)
    
            const result = await fetch(
                apiUrl,
                {
                    method: "POST",
                    body: fileData,
                },
            ).then((r) => r.json())
    
            setFormData({ ...formData, img_URL: result.url })
            setIsLoading(false)
        }

        // set preview
        const newFile = new FileReader()
        newFile.onload = function() {
            setPreview(newFile.result)
        }
        newFile.readAsDataURL(files[0])
        // upload
        if (files[0]) {
            setIsLoading(true)
            uploadFile(files[0])
        }
	}, [apiKey, apiUrl, formData, setFormData])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})


	return (
		<>
			<label htmlFor="img">{label}</label>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
                <DragUploadButton
                    onClick={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                >
                    {isDragActive ? (
                        <FontAwesomeIcon icon={faSquarePlus} />
                    ) : (
                        <FontAwesomeIcon icon={faUpload} />
                    )}
                </DragUploadButton>
                {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} />
                    ) : (
                        <PreviewImg
                            circle={isCircle}
                            src={(preview || defaultImage).toString()}
                        />
                    )}
			</div>
		</>
	)
}

export { ImageUpload }
