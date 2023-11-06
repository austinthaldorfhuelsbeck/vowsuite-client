import { FileUpload } from "./utils/FileUpload"
import { copy } from "../../data/app-constants"
import { InputGroup } from "./utils/InputGroups"
import { useStatus } from "../../hooks/useStatus"
import { useUserForm } from "../../hooks/useUserForm"
import { BannerActions } from "./utils/BannerActions"
import { initialUserData } from "../../data/initial-data"
import { useUserContext } from "../../context/ContextProvider"
import { Form, FormRow } from "../../styles/components/forms.style"
import {
	user_email_validation,
	user_name_validation,
} from "./utils/inputValidation"
import {
	DashboardHeader,
	StudioHeaderContainer,
} from "../../styles/layouts/dashboard-layout.style"

function UserForm() {
	// load context
	const { user } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onReset, onSubmit } = useUserForm(
		handleSuccess,
		handleError,
	)

	// build props
	const bannerActionsProps = {
		success,
		error,
		reset: !(user === undefined),
		onReset,
		onSubmit,
	}

	return (
		<Form onSubmit={onSubmit} noValidate autoComplete="off">
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
					isCircle
				/>
			</FormRow>
		</Form>
	)
}

export { UserForm }
