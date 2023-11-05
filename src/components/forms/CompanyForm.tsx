import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react"

import { copy } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
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
import { listFonts } from "../../services/fonts.service"
import { IFont } from "../../interfaces/models"

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

	// State
	const [fonts, setFonts] = useState<(IFont | undefined)[]>([])

	// Effects
	useEffect(() => {
		async function getAllFonts() {
			try {
				const allFonts: IFont[] = (await listFonts()).data
				setFonts(allFonts)
			} catch (err) {
				console.error(err)
			}
		}
		getAllFonts()
	}, [])
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
			<DashboardHeader>{copy.companyFormSubheader}</DashboardHeader>
			{fonts && (
				<ControlGroup
					{...font_validation}
					options={fonts}
					value={formData.font_id}
					onChange={onChange}
				/>
			)}
		</>
	)
}

export { CompanyForm }
