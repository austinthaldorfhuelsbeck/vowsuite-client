import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

import { InputGroup } from "./utils/InputGroups"
import { copy } from "../../data/app-constants"
import { useStatus } from "../../hooks/useStatus"
import { FileUpload } from "./utils/FileUpload"
import { useUserForm } from "../../hooks/useUserForm"
import { initialUserData } from "../../data/initial-data"
import { useUserContext } from "../../context/ContextProvider"
import { Alert, Form, FormRow } from "../../styles/components/forms.style"
import { TransparentButton } from "../../styles/components/buttons.style"
import { ContentBlockHeader } from "../../styles/components/content.style"
import {
	user_email_validation,
	user_name_validation,
} from "./utils/inputValidation"

function UserForm() {
	// load context
	const { user } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onClear, onReset, onSubmit } =
		useUserForm(handleSuccess, handleError)

	return (
		<Form onSubmit={onSubmit} noValidate autoComplete="off">
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
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					defaultUrl={user?.img_URL || initialUserData.img_URL}
					label="Profile Image"
					isCircle
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
