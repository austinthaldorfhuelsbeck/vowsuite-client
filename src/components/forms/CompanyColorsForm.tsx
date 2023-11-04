import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react"

import { InputError, InputGroup } from "./utils/InputGroups"
import { useStatus } from "../../hooks/useStatus"
import { BannerActions } from "./utils/BannerActions"
import { useUserContext } from "../../context/ContextProvider"
import { ICompany, ICompanyColor } from "../../interfaces/models"
import { Form, FormInput, FormRow } from "../../styles/components/forms.style"
import { listCompanyColors } from "../../services/companies.service"
import { useCompanyColorForm } from "../../hooks/useCompanyColorForm"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"

interface ComponentProps {
	submit: SyntheticEvent<HTMLButtonElement> | undefined
	reset: SyntheticEvent<HTMLButtonElement> | undefined
}

interface InputProps extends ComponentProps {
	companyColor: ICompanyColor
}

function ColorInputGroup({
	companyColor,
	submit,
	reset,
}: PropsWithChildren<InputProps>) {
	// Context
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, onChange, onReset, onSubmit } = useCompanyColorForm(
		handleSuccess,
		handleError,
		companyColor,
	)

	// Props
	const bannerProps = {
		success,
		error,
	}

	// Effects
	useEffect(() => {
		if (submit) onSubmit(submit)
		if (reset) onReset(reset)
	}, [onReset, onSubmit, reset, submit])

	return (
		<>
			<FormInput
				type="color"
				name="value"
				color
				value={formData.value}
				onChange={onChange}
			/>
			<InputError
				validation={{
					required: { value: true, message: "No color selected" },
				}}
				value={formData.value}
			/>
			<BannerActions {...bannerProps} />
		</>
	)
}

function CompanyColorsForm({
	submit,
	reset,
}: PropsWithChildren<ComponentProps>) {
	// Context
	const { user } = useUserContext()

	// State
	const [colors, setColors] = useState<(ICompanyColor | undefined)[]>([])

	// Effects
	useEffect(() => {
		async function listColors(company: ICompany) {
			setColors((await listCompanyColors(company.company_id)).data)
		}
		if (user?.company) listColors(user.company)
	}, [user])

	return (
		<Form>
			<DashboardHeader>Colors</DashboardHeader>
			<FormRow>
				{colors.map(
					(color) =>
						color && (
							<ColorInputGroup
								key={color.company_color_id}
								companyColor={color}
								submit={submit}
								reset={reset}
							/>
						),
				)}
			</FormRow>
		</Form>
	)
}

export { CompanyColorsForm }
