import React, { useState } from "react"

import { FormProvider, useForm } from "react-hook-form"

import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

import { InputGroup } from "./InputGroups"
import { copy } from "../../data/app-constants"
import { IVideo } from "../../interfaces/models"
import { InlineButton } from "../buttons/InlineButton"
import { readUser } from "../../services/users.service"
import { initialVideoData } from "../../data/initial-data"
import { Alert } from "../../styles/components/content.style"
import { IApiResponse } from "../../interfaces/api"
import { createVideo, updateVideo } from "../../services/videos.service"
import { Form, FormActionsContainer } from "../../styles/components/modal.style"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../context/ContextProvider"
import {
	img_URL_validation,
	video_name_validation,
	video_URL_validation,
} from "./utils/inputValidation"
import { readGallery } from "../../services/galleries.service"
import { useMessage } from "../../hooks/useMessage"

function VideoForm() {
	// load context
	const { setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()
	// determine initial form data from context
	let initialFormData: IVideo = video ? video : initialVideoData

	// state
	const methods = useForm({ defaultValues: initialFormData })
	const { success, error, updateWithSuccess, updateWithError, clear } =
		useMessage()
	// handlers
	const handleClear = (data: IVideo) => {
		methods.reset(data)
		clear()
	}
	const handleSubmit = methods.handleSubmit(async (formData: IVideo) => {
		// update or create
		const request: IVideo = gallery
			? { ...formData, gallery_id: gallery.gallery_id }
			: formData
		// call API
		const responseVideo: IApiResponse = video
			? await updateVideo(request, video.video_id)
			: await createVideo(request)
		// cleanup
		if (responseVideo.data) {
			// update video context
			setVideo(responseVideo.data)
			const responseGallery: IApiResponse = await readGallery(
				formData.gallery_id.toString(),
			)
			if (responseGallery.data) {
				// update gallery context
				setGallery(responseGallery.data)
				// update user context
				const responseUser: IApiResponse = await readUser(
					responseGallery.data.user_id,
				)
				if (responseUser.data) setUserMetadata(responseUser.data)
			}
			// update success banner
			// then it disappears and clears the form
			updateWithSuccess()
			setVideo(undefined)
			setTimeout(handleClear, 3000, initialVideoData)
		}
		if (responseVideo.error) {
			// update error banner
			updateWithError(responseVideo.error)
			setTimeout(clear, 3000)
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

export { VideoForm }
