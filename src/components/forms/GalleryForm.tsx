import { copy, imagePaths } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { useGalleryForm } from "../../hooks/useGalleryForm"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import {
	FormColumn,
	FormContainer,
	FormRow,
} from "../../styles/components/forms.style"
import {
	color_validation,
	font_validation,
	gallery_name_validation,
} from "./utils/inputValidation"
import {
	DashboardHeader,
	StudioHeaderContainer,
} from "../../styles/layouts/dashboard-layout.style"
import { PropsWithChildren, useEffect, useState } from "react"
import { IFont, IGallery } from "../../interfaces/models"
import { listFonts } from "../../services/vs-api/fonts.service"
import { usePreview } from "../../hooks/usePreview"
import { BannerActions } from "./utils/BannerActions"

interface ComponentProps {
	gallery: IGallery
}

function GalleryForm({ gallery }: PropsWithChildren<ComponentProps>) {
	// Context
	const { getUrlFromAws } = usePreview()
	const { useBase, useColor0, useColor1, useColor2, bannerProps } =
		useGalleryForm(gallery)

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
		if (gallery?.img_URL) getUrlFromAws(gallery.img_URL)
	})
	// load gallery on switch
	useEffect(() => {
		if (useBase.formData.gallery_id !== gallery.gallery_id)
			useBase.setFormData(gallery)
		if (gallery?.colors && gallery.colors[0])
			useColor0.setFormData(gallery.colors[0])
		if (gallery?.colors && gallery.colors[1])
			useColor1.setFormData(gallery.colors[1])
		if (gallery?.colors && gallery.colors[2])
			useColor2.setFormData(gallery.colors[2])
	}, [gallery, useBase, useColor0, useColor1, useColor2])

	return (
		<FormContainer noValidate autoComplete="off">
			<StudioHeaderContainer>
				<DashboardHeader>{copy.galleryFormHeader}</DashboardHeader>
				<BannerActions {...bannerProps} />
			</StudioHeaderContainer>
			<FormRow>
				<FormColumn>
					<DashboardHeader>
						<InputGroup
							{...gallery_name_validation}
							value={useBase.formData.gallery_name}
							onChange={useBase.onChange}
						/>
					</DashboardHeader>
					<FileUpload
						formData={useBase.formData}
						setFormData={useBase.setFormData}
						label="Cover Image"
						defaultUrl={imagePaths.defaultUser}
					/>
				</FormColumn>
				<FormColumn>
					<DashboardHeader>Branding</DashboardHeader>
					{fonts && (
						<ControlGroup
							{...font_validation}
							options={fonts}
							value={useBase.formData.font_id}
							onChange={useBase.onChange}
						/>
					)}
					<FormRow>
						<FormColumn>
							<label>Primary Color</label>
							<InputGroup
								{...color_validation}
								value={useColor0.formData.value}
								onChange={useColor0.onChange}
							/>
						</FormColumn>
						<FormColumn>
							<label>Secondary Color</label>
							<InputGroup
								{...color_validation}
								value={useColor1.formData.value}
								onChange={useColor1.onChange}
							/>
						</FormColumn>
						<FormColumn>
							<label>Accent Color</label>
							<InputGroup
								{...color_validation}
								value={useColor2.formData.value}
								onChange={useColor2.onChange}
							/>
						</FormColumn>
					</FormRow>
				</FormColumn>
			</FormRow>
		</FormContainer>
	)
}

export { GalleryForm }
