import {
	ChangeEvent,
	PropsWithChildren,
	SyntheticEvent,
	useEffect,
	useState,
} from "react"

import { InputGroup } from "./utils/InputGroups"
import { color_validation } from "./utils/inputValidation"
import { useUserContext } from "../../context/ContextProvider"
import { ICompany, ICompanyColor, IGalleryColor } from "../../interfaces/models"
import { FormRow } from "../../styles/components/forms.style"
import { listCompanyColors } from "../../services/vs-api/companies.service"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"

interface ComponentProps {
	formData: ICompanyColor
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onReset: (e: SyntheticEvent<HTMLButtonElement>) => void
	onSubmit: (e: SyntheticEvent) => void
}

function CompanyColorsForm({
	formData,
	onChange,
	onReset,
	onSubmit,
}: PropsWithChildren<ComponentProps>) {
	return (
		<>
			<DashboardHeader>Colors</DashboardHeader>
			<FormRow>
				{/* {JSON.stringify(formData)}Z */}
				{/* {colors.map(
					(color) =>
						color && (
							<InputGroup
								key={color.company_color_id}
								{...color_validation}
								value={formData.value}
								onChange={onChange}
							/>
						),
				)} */}
			</FormRow>
		</>
	)
}

export { CompanyColorsForm }
