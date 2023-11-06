import { copy, imagePaths } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { useGalleryForm } from "../../hooks/useGalleryForm"
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
import { listFonts } from "../../services/vs-api/fonts.service"
import { IAppError } from "../../interfaces/api"
import { GalleryColorsForm } from "./GalleryColorsForm"
import { usePreview } from "../../hooks/usePreview"

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
	const { preview, getUrlFromAws } = usePreview()

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
	// update gallery if it exists
	useEffect(() => {
		if (gallery) setFormData(gallery)
	}, [gallery, setFormData])
	// load preview image from aws
	useEffect(() => {
		if (gallery?.img_URL) getUrlFromAws(gallery.img_URL)
	})

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
						label="Cover Image"
						defaultUrl={preview || imagePaths.defaultUser}
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
