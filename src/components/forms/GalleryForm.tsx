import { copy, imagePaths } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { useGalleryForm } from "../../hooks/useGalleryForm"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import { FormColumn, FormRow } from "../../styles/components/forms.style"
import {
	font_validation,
	gallery_name_validation,
} from "./utils/inputValidation"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import { PropsWithChildren, useEffect, useState } from "react"
import { IFont, IGallery } from "../../interfaces/models"
import { listFonts } from "../../services/vs-api/fonts.service"
import { usePreview } from "../../hooks/usePreview"
import { useStatus } from "../../hooks/useStatus"

interface ComponentProps {
	gallery: IGallery
}

function GalleryForm({ gallery }: PropsWithChildren<ComponentProps>) {
	// Context
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onReset, onSubmit } =
		useGalleryForm(handleSuccess, handleError)
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
					{/* <GalleryColorsForm {...formProps} /> */}
				</FormColumn>
			</FormRow>
		</>
	)
}

export { GalleryForm }
