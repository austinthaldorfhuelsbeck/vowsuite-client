// Dependencies
import * as React from "react"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../context/ContextProvider"
// Data
import { IVideo } from "../../interfaces/models"
import { initialVideoData } from "../../data/initial-data"
// Styles
import { Form, FormActionsContainer } from "../../styles/components/modal.style"
import { FormProvider, useForm } from "react-hook-form"
import { IApiResponse, IAppError } from "../../interfaces/api"
import { createVideo, updateVideo } from "../../services/videos.service"
import { copy } from "../../data/app-constants"
import { InlineButton } from "../buttons/InlineButton"
import {
	img_URL_validation,
	video_URL_validation,
	video_name_validation,
} from "./utils/inputValidation"
import { InputGroup } from "./InputGroups"
import { Alert } from "../../styles/components/content.style"
import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"
import { readUser } from "../../services/users.service"

export const VideoForm: React.FC = () => {
	// load context
	const { userMetadata, setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()
	// determine initial form data from context
	let initialFormData: IVideo = video ? video : initialVideoData

	// state
	const methods = useForm({ defaultValues: initialFormData })
	const [success, setSuccess] = React.useState<boolean>(false)
	const [error, setError] = React.useState<IAppError | undefined>(undefined)
	// handlers
	const handleClear = (data: IVideo) => {
		methods.reset(data)
		setSuccess(false)
		setError(undefined)
	}
	const handleSubmit = methods.handleSubmit(async (formData: IVideo) => {
		const request: IVideo = gallery
			? { ...formData, gallery_id: gallery.gallery_id }
			: formData
		// call API
		const response: IApiResponse = video
			? await updateVideo(request, video.video_id)
			: await createVideo(request)
		// response is the full parent gallery
		if (response.data) {
			// update user context
			setUserMetadata((await readUser(response.data.user_id)).data)
			// update gallery context
			setGallery(response.data)
			// update video context
			setVideo(request)
			// update success banner
			setSuccess(true)
			setTimeout(setSuccess, 3000, false)
		}
		if (response.error) {
			// update error banner
			setError(response.error)
			setTimeout(setError, 3000, undefined)
		}
	})

	return (
		<FormProvider {...methods}>
			<Form
				onSubmit={(e: any) => e.preventDefault()}
				noValidate
				autoComplete="off"
			>
				<InputGroup {...video_name_validation} />
				<InputGroup {...video_URL_validation} />
				<InputGroup {...img_URL_validation} />
				{(success || error) && (
					<Alert error={error !== undefined}>
						{error ? error.message : copy.formSuccess}
					</Alert>
				)}
				<FormActionsContainer>
					{video && (
						<InlineButton
							icon={faRefresh}
							title="Reset"
							onClick={() => handleClear(initialFormData)}
						/>
					)}
					<InlineButton
						icon={faCancel}
						title="Clear"
						onClick={() => handleClear(initialVideoData)}
					/>
					<InlineButton
						icon={faArrowAltCircleRight}
						title="Submit"
						onClick={handleSubmit}
					/>
				</FormActionsContainer>
			</Form>
		</FormProvider>
	)
}
