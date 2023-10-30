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
	FormColumn,
	PreviewImg,
	PreviewVideo,
	ProgressBar,
	ProgressBarProgress,
} from "../../../styles/components/forms.style"
import { useDropzone } from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus, faUpload } from "@fortawesome/free-solid-svg-icons"
import { IApiResponse } from "../../../interfaces/api"
import { uploadFileToCloudinary } from "../../../services/upload.service"
import { PutObjectCommand, S3, S3Client } from "@aws-sdk/client-s3"
import AWS from "aws-sdk"

// Config
const S3_BUCKET = "vowsuite-videos"
const s3Config = {
	accessKeyId: "AKIATLUNANIXEX7GR5Z2",
	secretAccessKey: "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",
}

// Models
interface BaseProps {
	isCircle?: boolean
	isVideo?: boolean
}
interface PreviewProps extends BaseProps {
	src: string
}
interface ComponentProps extends BaseProps {
	formData: any
	setFormData: Dispatch<SetStateAction<any>>
	defaultUrl: string
	label: string
}

// Components
function Preview({ isCircle, isVideo, src }: PropsWithChildren<PreviewProps>) {
	if (isVideo) return <PreviewVideo src={src} />
	return <PreviewImg src={src} circle={isCircle} />
}
function FileUpload({
	formData,
	setFormData,
	defaultUrl,
	label,
	isCircle,
	isVideo,
}: PropsWithChildren<ComponentProps>) {
	// State
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
	const [progress, setProgress] = useState<number>(0)

	// Callbacks
	const onDrop = useCallback(
		(files: File[]) => {
			// // uploads a file to cloudinary
			// async function uploadToCloudinary(file: File) {
			// 	const response: IApiResponse = await uploadFileToCloudinary(
			// 		file,
			// 	)
			// 	setFormData(
			// 		isVideo
			// 			? { ...formData, video_url: response.data.url }
			// 			: { ...formData, img_URL: response.data.url },
			// 	)
			// }

			async function uploadToAws(file: File) {
				const target = {
					Bucket: S3_BUCKET,
					Key: file.name,
					Body: file,
				}
				const s3 = new AWS.S3({
					region: "us-west-2",
					credentials: s3Config,
				})
				const response = await s3
					.putObject(target)
					.on("httpUploadProgress", (e) => {
						setProgress(Math.round((e.loaded / e.total) * 100))
					})
					.promise()
				const url = await s3.getSignedUrl("getObject", {
					Bucket: S3_BUCKET,
					Key: file.name,
				})
				setFormData(
					isVideo
						? { ...formData, video_URL: url }
						: { ...formData, img_URL: url },
				)
				setPreview(url)
				return response
			}

			// upload
			if (files[0]) {
				// uploadToCloudinary(files[0])
				uploadToAws(files[0])
			}
		},
		[formData, isVideo, setFormData],
	)
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	// Return
	return (
		<>
			<label htmlFor="file">{label}</label>
			{100 > progress && 0 < progress ? (
				<ProgressBar>
					<ProgressBarProgress
						done={progress}
					>{`${progress}%`}</ProgressBarProgress>
				</ProgressBar>
			) : (
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
				</div>
			)}

			<Preview
				isCircle={isCircle}
				isVideo={isVideo}
				src={(preview || defaultUrl).toString()}
			/>
		</>
	)
}

export { FileUpload }
