import { FileUpload } from "./utils/FileUpload"
import { copy, imagePaths } from "../../data/app-constants"
import { InputGroup } from "./utils/InputGroups"
import { useStatus } from "../../hooks/useStatus"
import { useUserForm } from "../../hooks/useUserForm"
import { BannerActions } from "./utils/BannerActions"
import { useUserContext } from "../../context/ContextProvider"
import { FormContainer, FormRow } from "../../styles/components/forms.style"
import {
	user_email_validation,
	user_name_validation,
} from "./utils/inputValidation"
import {
	DashboardHeader,
	StudioHeaderContainer,
} from "../../styles/layouts/dashboard-layout.style"
import { usePreview } from "../../hooks/usePreview"
import { useEffect } from "react"

function UserForm() {
	// Context
	const { user } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onReset, onSubmit } =
		useUserForm(user)
	const { preview, getUrlFromAws } = usePreview()

	// Props
	const bannerActionsProps = {
		success,
		error,
		reset: !(user === undefined),
		onReset,
		onSubmit,
	}

	// Effects
	useEffect(() => {
		if (user?.img_URL) getUrlFromAws(user.img_URL)
	})

	return (
		<FormContainer onSubmit={onSubmit} noValidate autoComplete="off">
			<StudioHeaderContainer>
				<DashboardHeader>{copy.userFormHeader}</DashboardHeader>
				<BannerActions {...bannerActionsProps} />
			</StudioHeaderContainer>
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
					label="Profile Image"
					defaultUrl={preview || imagePaths.defaultUser}
					isCircle
				/>
			</FormRow>
		</FormContainer>
	)
}

export { UserForm }
