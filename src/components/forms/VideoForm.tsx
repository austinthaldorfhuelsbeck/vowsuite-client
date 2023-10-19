import React, { useState } from "react"

import { FormProvider, useForm } from "react-hook-form"

import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../data/app-constants"
import { IVideo } from "../../interfaces/models"
import { InlineButton } from "../buttons/InlineButton"
import { readUser } from "../../services/users.service"
import { initialVideoData } from "../../data/initial-data"
import { Alert } from "../../styles/components/content.style"
import { IApiResponse, IAppError } from "../../interfaces/api"
import { createVideo, updateVideo } from "../../services/videos.service"
import { Form, FormActionsContainer } from "../../styles/components/modal.style"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../context/ContextProvider"

function VideoForm() {
	// load context
	const { setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()
	// determine initial form data from context
	let initialFormData: IVideo = video ? video : initialVideoData

	// state
	const methods = useForm({ defaultValues: initialFormData })
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<IAppError | undefined>(undefined)
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
				{/* <TextInputGroup {...video_name_validation} />
				<TextInputGroup {...video_URL_validation} />
				<FileInputGroup {...img_URL_validation} /> */}
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

export { VideoForm }
