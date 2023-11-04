import { PropsWithChildren, SyntheticEvent, useEffect } from "react"

import { copy } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { Form } from "../../styles/components/forms.style"
import { useCompanyForm } from "../../hooks/useCompanyForm"
import { initialCompanyData } from "../../data/initial-data"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import { useUserContext } from "../../context/ContextProvider"
import {
	company_name_validation,
	font_validation,
} from "./utils/inputValidation"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import { IAppError } from "../../interfaces/api"

interface ComponentProps {
	submit: SyntheticEvent<HTMLButtonElement> | undefined
	reset: SyntheticEvent<HTMLButtonElement> | undefined
	handleSuccess: () => void
	handleError: (e: IAppError) => void
}

function CompanyForm({
	submit,
	reset,
	handleSuccess,
	handleError,
}: PropsWithChildren<ComponentProps>) {
	// Context
	const { user } = useUserContext()
	const { formData, setFormData, onChange, onReset, onSubmit } =
		useCompanyForm(handleSuccess, handleError)

	// Effects
	useEffect(() => {
		if (submit) onSubmit(submit)
		if (reset) onReset(reset)
	}, [onReset, onSubmit, reset, submit])

	return (
		<>
			<DashboardHeader>{copy.companyFormHeader}</DashboardHeader>
			<InputGroup
				{...company_name_validation}
				value={formData.company_name}
				onChange={onChange}
			/>
			<FileUpload
				formData={formData}
				setFormData={setFormData}
				defaultUrl={
					user?.company?.img_URL || initialCompanyData.img_URL
				}
				label="Company Logo"
				isCircle
			/>
			<ControlGroup
				{...font_validation}
				value={formData.font_id}
				onChange={onChange}
			/>
		</>
	)
}

export { CompanyForm }
