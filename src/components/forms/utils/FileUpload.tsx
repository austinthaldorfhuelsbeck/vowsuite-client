import {
	Dispatch,
	MouseEvent,
	PropsWithChildren,
	SetStateAction,
	SyntheticEvent,
	useCallback,
	useEffect,
} from "react"

import { useDropzone } from "react-dropzone"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowUp,
	faCheckCircle,
	faEye,
	faPlayCircle,
	faSquarePlus,
	faUpload,
} from "@fortawesome/free-solid-svg-icons"

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
import {
	ButtonTitle,
	TransparentButton,
} from "../../../styles/components/buttons.style"
import { usePreview } from "../../../hooks/usePreview"
import { Modal } from "../../menus/Modal"
import ReactPlayer from "react-player"
import { BigIcon } from "../../../styles/components/util.style"

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
	const {
		preview,
		progress,
		validUrl,
		getUrlFromAws,
		uploadToAws,
		setPreview,
	} = usePreview()

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
				uploadToAws(files[0])
			}
		},
		[formData, isVideo, setFormData, setPreview, uploadToAws],
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
			if (validUrl) setPreview(validUrl)
		} else {
			setPreview(defaultUrl)
		}
	}, [defaultUrl, formData.img_URL, setPreview, getUrlFromAws, validUrl])

	return (
		<FormRow>
			<ButtonTitle htmlFor="file">{label}</ButtonTitle>
			{!isVideo && (
				<Modal
					button={
						isCircle ? (
							<PreviewImg src={preview} />
						) : (
							<ThumbnailImg src={preview} />
						)
					}
					content={<ShadowboxImg src={preview} />}
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
					<DragUploadButton
						onClick={(e: MouseEvent<HTMLButtonElement>) =>
							e.preventDefault()
						}
					>
						{progress === 100 ? (
							<FontAwesomeIcon icon={faCheckCircle} />
						) : isDragActive ? (
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
