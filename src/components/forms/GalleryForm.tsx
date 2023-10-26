import React, { useState } from "react"

import { FormProvider, useForm } from "react-hook-form"

import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../data/app-constants"
import { InlineButton } from "../buttons/InlineButton"
import { readUser } from "../../services/users.service"
import { initialGalleryData } from "../../data/initial-data"
import { ControlGroup, InputGroup } from "./InputGroups"
import { Alert } from "../../styles/components/content.style"
import { IApiResponse, IAppError } from "../../interfaces/api"
import { IBaseGallery } from "../../interfaces/models"
import { createGallery, updateGallery } from "../../services/galleries.service"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import {
	font_validation,
	gallery_name_validation,
	hex1_validation,
	hex2_validation,
	hex3_validation,
} from "./utils/inputValidation"
import { Form, FormRow } from "../../styles/components/forms.style"

function GalleryForm() {
	// load context
	const { userMetadata, setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	// determine initial form data from context
	let initialFormData: IBaseGallery = initialGalleryData
	if (userMetadata) {
		if (gallery) {
			// load selected gallery and userID
			initialFormData = { ...gallery, user_id: userMetadata.user_id }
		} else {
			// load userID to initial data
			initialFormData = {
				...initialGalleryData,
				user_id: userMetadata.user_id,
			}
		}
	}

	// state
	const methods = useForm({ defaultValues: initialFormData })
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<IAppError | undefined>(undefined)
	// handlers
	const handleClear = (data: IBaseGallery) => {
		methods.reset(data)
		setSuccess(false)
		setError(undefined)
	}
	const handleSubmit = methods.handleSubmit(
		async (formData: IBaseGallery) => {
			// call API
			const response: IApiResponse = gallery
				? await updateGallery(formData, gallery.gallery_id)
				: await createGallery(formData)
			if (response.data) {
				// update user context
				if (userMetadata) {
					setUserMetadata(
						(await readUser(response.data.user_id)).data,
					)
				}
				// update gallery context
				setGallery(response.data)
				// update success banner
				setSuccess(true)
				setTimeout(setSuccess, 3000, false)
			}
			if (response.error) {
				// update error banner
				setError(response.error)
				setTimeout(setError, 3000, undefined)
			}
		},
	)

	return (
		<FormProvider {...methods}>
			<Form
				onSubmit={(e: any) => e.preventDefault()}
				noValidate
				autoComplete="off"
			>
				<FormRow>
					<InputGroup {...gallery_name_validation} />
					<input type="file" name="image" />
					{/* <InputGroup {...img_URL_validation} /> */}
					<ControlGroup {...font_validation} />

					<InputGroup {...hex1_validation} />
					<InputGroup {...hex2_validation} />
					<InputGroup {...hex3_validation} />
					{(success || error) && (
						<Alert error={error !== undefined}>
							{error ? error.message : copy.formSuccess}
						</Alert>
					)}
				</FormRow>
				<FormRow>
					{gallery && (
						<InlineButton
							icon={faRefresh}
							title="Reset"
							onClick={() => handleClear(initialFormData)}
						/>
					)}
					<InlineButton
						icon={faCancel}
						title="Clear"
						onClick={() => handleClear(initialGalleryData)}
					/>
					<InlineButton
						icon={faArrowAltCircleRight}
						title="Submit"
						onClick={handleSubmit}
					/>
				</FormRow>
			</Form>
		</FormProvider>
	)
}

export { GalleryForm }
