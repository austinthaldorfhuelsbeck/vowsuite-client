import { copy } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { useStatus } from "../../hooks/useStatus"
import { BannerActions } from "./utils/BannerActions"
import { useGalleryForm } from "../../hooks/useGalleryForm"
import { initialGalleryData } from "../../data/initial-data"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import { useGalleryContext } from "../../context/ContextProvider"
import { ContentBlockHeader } from "../../styles/components/content.style"
import {
	Form,
	FormInput,
	FormInputOverlay,
	FormRow,
	PreviewHeader,
} from "../../styles/components/forms.style"
import {
	font_validation,
	gallery_name_validation,
	hex1_validation,
	hex2_validation,
	hex3_validation,
} from "./utils/inputValidation"

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
		onReset,
		onClear,
		onSubmit,
	}

	return (
		<Form onSubmit={onSubmit} noValidate autoComplete="off">
			<FormRow>
				<ContentBlockHeader>
					{copy.galleryFormHeader}
				</ContentBlockHeader>
			</FormRow>

			<FormRow>
				<InputGroup
					{...gallery_name_validation}
					value={formData.gallery_name}
					onChange={onChange}
				/>
				<PreviewHeader font={formData.font}>
					{formData.gallery_name}
				</PreviewHeader>
			</FormRow>

			<FormRow>
				<ControlGroup
					{...font_validation}
					value={formData.font}
					onChange={onChange}
				/>
			</FormRow>

			<FormRow>
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					defaultUrl={gallery?.img_URL || initialGalleryData.img_URL}
					label="Thumbnail Image"
				/>
			</FormRow>

			<FormRow>
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
			</FormRow>

			<BannerActions {...bannerActionsProps} />
		</Form>
	)
}

export { GalleryForm }
