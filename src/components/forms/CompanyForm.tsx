import { copy } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { IFont } from "../../interfaces/models"
import { useStatus } from "../../hooks/useStatus"
import { BannerActions } from "./utils/BannerActions"
import { useCompanyForm } from "../../hooks/useCompanyForm"
import { initialCompanyData } from "../../data/initial-data"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import { useUserContext } from "../../context/ContextProvider"
import { company_name_validation } from "./utils/inputValidation"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import { Form, FormColumn, FormRow } from "../../styles/components/forms.style"
import { PropsWithChildren, SyntheticEvent, useEffect } from "react"

interface ComponentProps {
	submit: SyntheticEvent<HTMLButtonElement> | undefined
	reset: SyntheticEvent<HTMLButtonElement> | undefined
}

function CompanyForm({ submit, reset }: PropsWithChildren<ComponentProps>) {
	// context
	const { user } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onReset, onSubmit } =
		useCompanyForm(handleSuccess, handleError)

	// Props
	const bannerActionsProps = {
		success,
		error,
	}

	// Effects
	useEffect(() => {
		if (submit) onSubmit(submit)
		if (reset) onReset(reset)
	}, [onReset, onSubmit, reset, submit])

	const options: IFont[] = [
		{
			font_id: 0,
			font_name: "Georgia",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			font_id: 1,
			font_name: "Comic Sans",
			created_at: new Date(),
			updated_at: new Date(),
		},
	]

	return (
		<Form>
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
				label="Font"
				id="font_id"
				options={options}
				validation={{
					required: {
						value: true,
						message: "Select a font",
					},
				}}
				value={formData.font_id}
				onChange={onChange}
			/>
			<BannerActions {...bannerActionsProps} />
		</Form>
	)
}

export { CompanyForm }
