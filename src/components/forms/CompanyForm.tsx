import {
	ChangeEvent,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	SyntheticEvent,
	useEffect,
	useState,
} from "react"

import { copy, imagePaths } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { ICompany, IFont } from "../../interfaces/models"
import { usePreview } from "../../hooks/usePreview"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import { useUserContext } from "../../context/ContextProvider"
import { listFonts } from "../../services/vs-api/fonts.service"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import {
	color_validation,
	company_name_validation,
	font_validation,
} from "./utils/inputValidation"
import { FormColumn, FormRow } from "../../styles/components/forms.style"

interface ComponentProps {
	formData: ICompany
	setFormData: Dispatch<SetStateAction<ICompany>>
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onReset: (e: SyntheticEvent<HTMLButtonElement>) => void
	onSubmit: (e: SyntheticEvent) => void
}

function CompanyForm({
	formData,
	setFormData,
	onChange,
	onReset,
	onSubmit,
}: PropsWithChildren<ComponentProps>) {
	// Context
	const { user } = useUserContext()
	const { preview, validUrl, getUrlFromAws } = usePreview()

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
	// load preview image from aws
	useEffect(() => {
		if (user?.company?.img_URL) getUrlFromAws(user.company.img_URL)
	}, [getUrlFromAws, user?.company.img_URL])

	return (
		<>
			<FormColumn>
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
					defaultUrl={validUrl || preview || imagePaths.defaultUser}
					isCircle
				/>
				<DashboardHeader>{copy.companyFormSubheader}</DashboardHeader>
				{fonts ? (
					<ControlGroup
						{...font_validation}
						options={fonts}
						value={formData.font_id}
						onChange={onChange}
					/>
				) : (
					"Loading..."
				)}
				<DashboardHeader>Colors</DashboardHeader>
				<FormRow>
					{formData.colors.map(
						(color, index) =>
							color && (
								<InputGroup
									key={color.company_color_id}
									{...color_validation}
									value={formData.colors[index].value}
									onChange={onChange}
								/>
							),
					)}
				</FormRow>
			</FormColumn>
			<FormColumn>
				<pre>{JSON.stringify(formData, null, "\t")}</pre>
			</FormColumn>
		</>
	)
}

export { CompanyForm }
