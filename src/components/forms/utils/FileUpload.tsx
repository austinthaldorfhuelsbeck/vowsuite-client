import {
	Dispatch,
	MouseEvent,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useState,
} from "react"

import AWS from "aws-sdk"
import { useDropzone } from "react-dropzone"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus, faUpload } from "@fortawesome/free-solid-svg-icons"

import {
	DragUploadButton,
	FormColumn,
	FormInput,
	FormRow,
	PreviewImg,
	PreviewSubheader,
	PreviewVideo,
	ProgressBar,
	ProgressBarProgress,
} from "../../../styles/components/forms.style"
import { ButtonTitle } from "../../../styles/components/buttons.style"

// Config
const S3_BUCKET = "vowsuite-videos"
const accessKeyId: string = process.env.REACT_APP_AWS_ACCESS_KEY_ID || ""
const secretAccessKey: string =
	process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || ""
const s3 = new AWS.S3({
	region: "us-west-2",
	credentials: {
		accessKeyId: accessKeyId,
		secretAccessKey: secretAccessKey,
	},
})

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
	return (
		<>
			{isVideo ? (
				<PreviewVideo src={src} />
			) : (
				<PreviewImg src={src} circle={isCircle} />
			)}
		</>
	)
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

	// Constants
	const previewUrl: string = (preview || defaultUrl).toString()

	// Callbacks
	const onDrop = useCallback(
		(files: File[]) => {
			async function uploadToAws(file: File) {
				const target = {
					Bucket: S3_BUCKET,
					Key: file.name,
					Body: file,
				}
				await s3
					.putObject(target)
					.on("httpUploadProgress", (e) => {
						setProgress(Math.round((e.loaded / e.total) * 100))
					})
					.promise()
				await setUrlFromAws(file)
			}

			async function setUrlFromAws(file: File) {
				const target = {
					Bucket: S3_BUCKET,
					Key: file.name,
				}
				const response: string = await s3.getSignedUrl(
					"getObject",
					target,
				)
				const publicUrl: string = response.split("?")[0]
				setFormData(
					isVideo
						? { ...formData, video_URL: publicUrl }
						: { ...formData, img_URL: publicUrl },
				)
				setPreview(publicUrl)
			}

			// call upload function
			if (files[0]) {
				uploadToAws(files[0])
			}
		},
		[formData, isVideo, setFormData],
	)
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	return (
		<FormRow>
			<ButtonTitle htmlFor="file">{label}</ButtonTitle>
			<FormColumn>
				<FormRow>
					{100 > progress && 0 < progress ? (
						<ProgressBar>
							<ProgressBarProgress
								done={progress}
							>{`${progress}%`}</ProgressBarProgress>
						</ProgressBar>
					) : (
						<div {...getRootProps()}>
							<FormInput
								{...getInputProps()}
								color={false}
								text={false}
							/>
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
						src={previewUrl}
					/>
				</FormRow>
			</FormColumn>
		</FormRow>
	)
}

export { FileUpload }
