import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react"

import { InputGroup } from "./utils/InputGroups"
import { IAppError } from "../../interfaces/api"
import { color_validation } from "./utils/inputValidation"
import { useUserContext } from "../../context/ContextProvider"
import { ICompany, ICompanyColor } from "../../interfaces/models"
import { Form, FormRow } from "../../styles/components/forms.style"
import { listCompanyColors } from "../../services/vs-api/companies.service"
import { useCompanyColorForm } from "../../hooks/useCompanyColorForm"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"

interface ComponentProps {
	submit: SyntheticEvent<HTMLButtonElement> | undefined
	reset: SyntheticEvent<HTMLButtonElement> | undefined
	handleSuccess: () => void
	handleError: (e: IAppError) => void
}

interface InputProps extends ComponentProps {
	companyColor: ICompanyColor
}

function ColorInputGroup({
	companyColor,
	submit,
	reset,
	handleSuccess,
	handleError,
}: PropsWithChildren<InputProps>) {
	// Context
	const { formData, onChange, onReset, onSubmit } = useCompanyColorForm(
		handleSuccess,
		handleError,
		companyColor,
	)

	// Effects
	useEffect(() => {
		if (submit) onSubmit(submit)
		if (reset) onReset(reset)
	}, [onReset, onSubmit, reset, submit])

	return (
		<>
			<InputGroup
				{...color_validation}
				value={formData.value}
				onChange={onChange}
			/>
		</>
	)
}

function CompanyColorsForm({
	submit,
	reset,
	handleSuccess,
	handleError,
}: PropsWithChildren<ComponentProps>) {
	// Context
	const { user } = useUserContext()

	// State
	const [colors, setColors] = useState<(ICompanyColor | undefined)[]>([])

	// Props
	const props = {
		submit,
		reset,
		handleSuccess,
		handleError,
	}

	// Effects
	useEffect(() => {
		async function listColors(company: ICompany) {
			setColors((await listCompanyColors(company.company_id)).data)
		}
		if (user?.company) listColors(user.company)
	}, [user])

	return (
		<>
			<DashboardHeader>Colors</DashboardHeader>
			<FormRow>
				{colors.map(
					(color) =>
						color && (
							<ColorInputGroup
								key={color.company_color_id}
								companyColor={color}
								{...props}
							/>
						),
				)}
			</FormRow>
		</>
	)
}

export { CompanyColorsForm }
