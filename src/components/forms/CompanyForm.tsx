import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react"

import { copy, imagePaths } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { IFont } from "../../interfaces/models"
import { IAppError } from "../../interfaces/api"
import { usePreview } from "../../hooks/usePreview"
import { useCompanyForm } from "../../hooks/useCompanyForm"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import { useUserContext } from "../../context/ContextProvider"
import { listFonts } from "../../services/vs-api/fonts.service"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import {
	company_name_validation,
	font_validation,
} from "./utils/inputValidation"

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
	const { preview, getUrlFromAws } = usePreview()

	// State
	const [fonts, setFonts] = useState<(IFont | undefined)[]>([])

	// Effects
	// load all available fonts for select options
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
	// for submitting multiple forms at once
	useEffect(() => {
		if (submit) onSubmit(submit)
		if (reset) onReset(reset)
	}, [onReset, onSubmit, reset, submit])
	// load preview image from aws
	useEffect(() => {
		if (user?.company?.img_URL) getUrlFromAws(user.company.img_URL)
	})

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
				label="Company Logo"
				defaultUrl={preview || imagePaths.defaultUser}
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
