import { FileUpload } from "./utils/FileUpload"
import { copy } from "../../data/app-constants"
import { InputGroup } from "./utils/InputGroups"
import { useStatus } from "../../hooks/useStatus"
import { useUserForm } from "../../hooks/useUserForm"
import { BannerActions } from "./utils/BannerActions"
import { initialUserData } from "../../data/initial-data"
import { useUserContext } from "../../context/ContextProvider"
import { MagnifiedDiv } from "../../styles/components/util.style"
import { Form, FormRow } from "../../styles/components/forms.style"
import {
	user_email_validation,
	user_name_validation,
} from "./utils/inputValidation"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"

function UserForm() {
	// load context
	const { user } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onClear, onReset, onSubmit } =
		useUserForm(handleSuccess, handleError)

	// build props
	const bannerActionsProps = {
		success,
		error,
		reset: !(user === undefined),
		onReset,
		onClear,
		onSubmit,
	}

	return (
		<Form onSubmit={onSubmit} noValidate autoComplete="off">
			<DashboardHeader>{copy.userFormHeader}</DashboardHeader>

			<MagnifiedDiv>
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
			</MagnifiedDiv>

			<BannerActions {...bannerActionsProps} />
		</Form>
	)
}

export { UserForm }
