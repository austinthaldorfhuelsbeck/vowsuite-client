import React, { useState } from "react"

import { FormProvider, useForm } from "react-hook-form"

import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

import { InputGroup } from "./utils/InputGroups"
import { copy } from "../../data/app-constants"
import { IVideo } from "../../interfaces/models"
import { InlineButton } from "../buttons/InlineButton"
import { getUser } from "../../services/users.service"
import { initialVideoData } from "../../data/initial-data"
import { ContentBlockHeader } from "../../styles/components/content.style"
import { IApiResponse, IAppError } from "../../interfaces/api"
import { createVideo, updateVideo } from "../../services/videos.service"

import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../context/ContextProvider"
import { Alert, Form, FormRow } from "../../styles/components/forms.style"
import { useStatus } from "../../hooks/useStatus"
import { useVideoForm } from "../../hooks/useVideoForm"
import { TransparentButton } from "../../styles/components/buttons.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { video_name_validation } from "./utils/inputValidation"
import { FileUpload } from "./utils/FileUpload"

function VideoForm() {
	// load context
	const { video } = useVideoContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onClear, onReset, onSubmit } =
		useVideoForm(handleSuccess, handleError)

	return (
		<Form onSubmit={onSubmit} noValidate autoComplete="off">
			<FormRow>
				<ContentBlockHeader>Video Details</ContentBlockHeader>
			</FormRow>

			<FormRow>
				<InputGroup
					{...video_name_validation}
					value={formData.video_name}
					onChange={onChange}
				/>
			</FormRow>

			<FormRow>
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					defaultUrl={video?.video_URL || initialVideoData.video_URL}
					label="Upload Video"
					isVideo
				/>
			</FormRow>

			<FormRow>
				<Alert>{`Views: ${formData.views}`}</Alert>
				<Alert>{`Downloads: ${formData.downloads}`}</Alert>
			</FormRow>

			<FormRow>
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					defaultUrl={video?.img_URL || initialVideoData.img_URL}
					label="Thumbnail Image"
				/>
			</FormRow>

			<FormRow>
				{(success || error) && (
					<Alert error={error !== undefined} success={success}>
						{error ? error.message : copy.formSuccess}
					</Alert>
				)}
			</FormRow>

			<FormRow>
				{video && (
					<TransparentButton onClick={onReset}>
						<FontAwesomeIcon icon={faRefresh} />
						{" Reset"}
					</TransparentButton>
				)}
				<TransparentButton onClick={onClear}>
					<FontAwesomeIcon icon={faCancel} />
					{" Clear"}
				</TransparentButton>
				<TransparentButton type="submit">
					<FontAwesomeIcon icon={faArrowAltCircleRight} />
					{" Submit"}
				</TransparentButton>
			</FormRow>
		</Form>
	)
}

export { VideoForm }
