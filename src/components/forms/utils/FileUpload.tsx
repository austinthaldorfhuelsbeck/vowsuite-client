import {
	Dispatch,
	MouseEvent,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useEffect,
} from "react"

import { useDropzone } from "react-dropzone"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus, faUpload } from "@fortawesome/free-solid-svg-icons"

import {
	DragUploadButton,
	FormInput,
	FormRow,
	PreviewImg,
	ProgressBar,
	ProgressBarProgress,
	ShadowboxImg,
	ThumbnailImg,
} from "../../../styles/components/forms.style"
import { ButtonTitle } from "../../../styles/components/buttons.style"
import { usePreview } from "../../../hooks/usePreview"
import { Modal } from "../../menus/Modal"

// Models
interface BaseProps {
	isCircle?: boolean
	isVideo?: boolean
}
interface ComponentProps extends BaseProps {
	formData: any
	setFormData: Dispatch<SetStateAction<any>>
	defaultUrl?: string
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
	// Context
	const { preview, progress, validUrl, getUrlFromAws, setPreview } =
		usePreview()

	// Callbacks
	const onDrop = useCallback(
		(files: File[]) => {
			if (files[0]) {
				setPreview(URL.createObjectURL(files[0]))
				setFormData(
					isVideo
						? { ...formData, video_URL: files[0].name }
						: { ...formData, img_URL: files[0].name },
				)
			}
		},
		[formData, isVideo, setFormData, setPreview],
	)
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	// Effects
	useEffect(() => {
		// fetches valid preview url or
		// rerenders preview on form reset
		if (formData.img_URL) {
			getUrlFromAws(formData.img_URL)
		} else {
			setPreview(defaultUrl)
		}
	}, [defaultUrl, formData.img_URL, setPreview, getUrlFromAws])

	return (
		<FormRow>
			<ButtonTitle htmlFor="file">{label}</ButtonTitle>
			{!isVideo && (
				<Modal
					button={
						isCircle ? (
							<PreviewImg src={validUrl || preview} />
						) : (
							<ThumbnailImg src={validUrl || preview} />
						)
					}
					content={<ShadowboxImg src={validUrl || preview} />}
				/>
			)}
			{100 > progress && 0 < progress ? (
				<ProgressBar>
					<ProgressBarProgress
						done={progress}
					>{`${progress}%`}</ProgressBarProgress>
				</ProgressBar>
			) : (
				<div {...getRootProps()}>
					<FormInput {...getInputProps()} />
					<p>{formData.img_URL}</p>
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
		</FormRow>
	)
}

export { FileUpload }
