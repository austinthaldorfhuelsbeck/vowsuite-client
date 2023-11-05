import { copy } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { useGalleryForm } from "../../hooks/useGalleryForm"
import { initialGalleryData } from "../../data/initial-data"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import { useGalleryContext } from "../../context/ContextProvider"
import { FormColumn, FormRow } from "../../styles/components/forms.style"
import {
	font_validation,
	gallery_name_validation,
} from "./utils/inputValidation"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react"
import { IFont } from "../../interfaces/models"
import { listFonts } from "../../services/fonts.service"
import { IAppError } from "../../interfaces/api"
import { CompanyColorsForm } from "./CompanyColorsForm"
import { GalleryColorsForm } from "./GalleryColorsForm"

interface ComponentProps {
	submit: SyntheticEvent<HTMLButtonElement> | undefined
	reset: SyntheticEvent<HTMLButtonElement> | undefined
	handleSuccess: () => void
	handleError: (e: IAppError) => void
}

function GalleryForm({
	submit,
	reset,
	handleSuccess,
	handleError,
}: PropsWithChildren<ComponentProps>) {
	// Context
	const { gallery } = useGalleryContext()
	const { formData, setFormData, onChange, onReset, onSubmit } =
		useGalleryForm(handleSuccess, handleError)

	// State
	const [fonts, setFonts] = useState<(IFont | undefined)[]>([])

	// Props
	const formProps = {
		submit,
		reset,
		handleSuccess,
		handleError,
	}

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
			<FormRow>
				<FormColumn>
					<DashboardHeader>
						<InputGroup
							{...gallery_name_validation}
							value={formData.gallery_name}
							onChange={onChange}
						/>
					</DashboardHeader>
					<FileUpload
						formData={formData}
						setFormData={setFormData}
						defaultUrl={
							gallery?.img_URL || initialGalleryData.img_URL
						}
						label="Cover Image"
					/>
				</FormColumn>
				<FormColumn>
					<DashboardHeader>
						{copy.companyFormSubheader}
					</DashboardHeader>
					{fonts && (
						<ControlGroup
							{...font_validation}
							options={fonts}
							value={formData.font_id}
							onChange={onChange}
						/>
					)}
					<GalleryColorsForm {...formProps} />
				</FormColumn>
			</FormRow>
		</>
	)
}

export { GalleryForm }
