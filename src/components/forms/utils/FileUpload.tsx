import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useState,
	MouseEvent,
} from "react"

import {
	DragUploadButton,
	PreviewImg,
	PreviewVideo,
} from "../../../styles/components/forms.style"
import { useDropzone } from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faSpinner,
	faSquarePlus,
	faUpload,
} from "@fortawesome/free-solid-svg-icons"
import { IApiResponse } from "../../../interfaces/api"
import { uploadFile } from "../../../services/upload.service"

interface BaseProps {
	isCircle?: boolean
	isVideo?: boolean
}

interface PreviewProps extends BaseProps {
	src: string
}

function Preview({ isCircle, isVideo, src }: PropsWithChildren<PreviewProps>) {
	if (isVideo) return <PreviewVideo src={src} />
	return <PreviewImg src={src} circle={isCircle} />
}

interface ComponentProps extends BaseProps {
	formData: any
	setFormData: Dispatch<SetStateAction<any>>
	defaultUrl: string
	label: string
}

function FileUpload({
	formData,
	setFormData,
	defaultUrl,
	label,
	isCircle,
	isVideo,
}: PropsWithChildren<ComponentProps>) {
	// constants
	const apiKey: string = process.env.REACT_APP_CLOUDINARY_API_KEY || ""

	// state
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// callbacks
	const onDrop = useCallback(
		(files: File[]) => {
			// uploads a file to cloudinary
			async function awaitFileResponse(file: File) {
				const fileData = new FormData()
				fileData.append("file", file)
				fileData.append(
					"upload_preset",
					"test-vowsuite-uploads-unsigned",
				)
				fileData.append("api_key", apiKey)

				const response: IApiResponse = await uploadFile(fileData)

				setFormData(
					isVideo
						? { ...formData, video_url: response.data.url }
						: { ...formData, img_URL: response.data.url },
				)
				setIsLoading(false)
			}

			// set preview
			const newFile = new FileReader()
			newFile.onload = function () {
				setPreview(newFile.result)
			}
			newFile.readAsDataURL(files[0])
			// upload
			if (files[0]) {
				setIsLoading(true)
				awaitFileResponse(files[0])
			}
		},
		[apiKey, formData, isVideo, setFormData],
	)
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	return (
		<>
			<label htmlFor="file">{label}</label>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				<DragUploadButton
					onClick={(e: MouseEvent<HTMLButtonElement>) =>
						e.preventDefault()
					}
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
					<Preview
						isCircle={isCircle}
						isVideo={isVideo}
						src={(preview || defaultUrl).toString()}
					/>
				)}
			</div>
		</>
	)
}

export { FileUpload }
