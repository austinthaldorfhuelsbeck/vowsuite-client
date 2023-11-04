import { copy } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { useStatus } from "../../hooks/useStatus"
import { BannerActions } from "./utils/BannerActions"
import { useGalleryForm } from "../../hooks/useGalleryForm"
import { initialGalleryData } from "../../data/initial-data"
import { InputGroup } from "./utils/InputGroups"
import { useGalleryContext } from "../../context/ContextProvider"
import { Form, FormRow } from "../../styles/components/forms.style"
import { gallery_name_validation } from "./utils/inputValidation"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"

function GalleryForm() {
	// load context
	const { gallery } = useGalleryContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onClear, onReset, onSubmit } =
		useGalleryForm(handleSuccess, handleError)

	// build props
	const bannerActionsProps = {
		success,
		error,
		reset: gallery !== undefined,
		onReset,
		onClear,
		onSubmit,
	}

	return (
		<Form onSubmit={onSubmit} noValidate autoComplete="off">
			<FormRow>
				<DashboardHeader>{copy.galleryFormHeader}</DashboardHeader>
			</FormRow>

			<FormRow>
				<InputGroup
					{...gallery_name_validation}
					value={formData.gallery_name}
					onChange={onChange}
				/>
			</FormRow>

			{/* <FormRow>
				<ControlGroup
					{...font_validation}
					value={formData.font}
					onChange={onChange}
				/>
			</FormRow> */}

			<FormRow>
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					defaultUrl={gallery?.img_URL || initialGalleryData.img_URL}
					label="Thumbnail Image"
				/>
			</FormRow>

			{/* <FormRow>
				<FormInputOverlay>{hex1_validation.label}</FormInputOverlay>
				<FormInput
					{...hex1_validation}
					value={formData.hex1}
					onChange={onChange}
					color
				/>
				<FormInputOverlay>{hex2_validation.label}</FormInputOverlay>
				<FormInput
					{...hex2_validation}
					value={formData.hex2}
					onChange={onChange}
					color
				/>
				<FormInputOverlay>{hex3_validation.label}</FormInputOverlay>
				<FormInput
					{...hex3_validation}
					value={formData.hex3}
					onChange={onChange}
					color
				/>
			</FormRow> */}

			<BannerActions {...bannerActionsProps} />
		</Form>
	)
}

export { GalleryForm }
