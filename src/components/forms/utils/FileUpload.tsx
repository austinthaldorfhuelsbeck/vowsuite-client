import {
	Dispatch,
	MouseEvent,
	PropsWithChildren,
	SetStateAction,
	useCallback,
} from "react"

import { useDropzone } from "react-dropzone"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus, faUpload } from "@fortawesome/free-solid-svg-icons"

import {
	DragUploadButton,
	FormColumn,
	FormInput,
	FormRow,
	PreviewImg,
	ProgressBar,
	ProgressBarProgress,
	ShadowboxImg,
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
	const { preview, progress, uploadToAws } = usePreview()

	// Callbacks
	const onDrop = useCallback(
		(files: File[]) => {
			// call upload function, set form data
			if (files[0]) {
				uploadToAws(files[0])
				setFormData(
					isVideo
						? { ...formData, video_URL: files[0].name }
						: { ...formData, img_URL: files[0].name },
				)
			}
		},
		[formData, isVideo, setFormData, uploadToAws],
	)
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	return (
		<FormRow>
			<ButtonTitle htmlFor="file">{label}</ButtonTitle>
			<FormColumn>
				<FormRow>
					{!isVideo && (
						<Modal
							button={
								<PreviewImg
									src={preview || defaultUrl}
									circle={isCircle}
								/>
							}
							content={
								<ShadowboxImg src={preview || defaultUrl} />
							}
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
								{isDragActive ? (
									<FontAwesomeIcon icon={faSquarePlus} />
								) : (
									<FontAwesomeIcon icon={faUpload} />
								)}
							</DragUploadButton>
						</div>
					)}
				</FormRow>
			</FormColumn>
		</FormRow>
	)
}

export { FileUpload }
