import React, { ChangeEvent, SyntheticEvent, useState } from "react"

import { FormProvider, useForm } from "react-hook-form"

import {
	faArrowAltCircleRight,
	faArrowCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

import { InputGroup } from "./InputGroups"
import { copy } from "../../data/app-constants"
import { IBaseUser, IUser } from "../../interfaces/models"
import { InlineButton } from "../buttons/InlineButton"
import { initialUserData } from "../../data/initial-data"
import {
	Alert,
	ContentBlockHeader,
} from "../../styles/components/content.style"
import { useUserContext } from "../../context/ContextProvider"
import { IApiResponse, IAppError } from "../../interfaces/api"
import { createUser, updateUser } from "../../services/users.service"

import {
	user_email_validation,
	user_name_validation,
} from "./utils/inputValidation"
import { Form, FormRow } from "../../styles/components/forms.style"
import { useStatus } from "../../hooks/useStatus"
import { TransparentButton } from "../../styles/components/buttons.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ImageUpload } from "./utils/ImageUpload"

function UserForm() {
	// load context
	const { user, setUser } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	// construct initial form data
	// in base user format (without galleries and company)
	const initialFormData: IBaseUser = user
		? {
				user_id: user.user_id,
				user_name: user.user_name,
				email: user.email,
				img_URL: user.img_URL,
				created_at: user.created_at,
				updated_at: new Date(),
		  }
		: initialUserData

	// state
	const [formData, setFormData] = useState<IBaseUser>(initialFormData)

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onClear(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		if (user) setFormData({ ...initialUserData, user_id: user.user_id })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		if (user) setFormData(user)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// call API
		const response: IApiResponse = user?.company
			? await updateUser(formData)
			: await createUser(formData)
		if (response.data) {
			// update context
			if (user) setUser(response.data)
			// useStatus
			handleSuccess()
		}
		if (response.error) {
			// useStatus
			handleError(response.error)
		}
	}

	return (
		<Form onSubmit={onSubmit}>
			<FormRow>
				<ContentBlockHeader>User Details</ContentBlockHeader>
			</FormRow>

			<FormRow>
				<InputGroup
					{...user_name_validation}
					value={formData.user_name}
					onChange={onChange}
				/>
			</FormRow>

			<FormRow>
				<InputGroup
					{...user_email_validation}
					value={formData.email}
					onChange={onChange}
				/>
			</FormRow>

			<FormRow>
				<ImageUpload
					formData={formData}
					setFormData={setFormData}
					defaultImage={user?.img_URL || initialUserData.img_URL}
					label="Profile Image"
				/>
			</FormRow>

			<FormRow>
				{(success || error) && (
					<Alert error={error !== undefined}>
						{error ? error.message : copy.formSuccess}
					</Alert>
				)}
			</FormRow>

			<FormRow>
				{user?.company && (
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

export { UserForm }
