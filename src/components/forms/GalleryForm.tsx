import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleRight, faCancel, faRefresh } from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../data/app-constants"
import { useStatus } from "../../hooks/useStatus"
import { ImageUpload } from "./utils/ImageUpload"
import { ControlGroup, InputGroup } from "./InputGroups"
import { useGalleryForm } from "../../hooks/useGalleryForm"
import { initialGalleryData } from "../../data/initial-data"
import { Form, FormRow } from "../../styles/components/forms.style"
import { TransparentButton } from "../../styles/components/buttons.style"
import { Alert, ContentBlockHeader } from "../../styles/components/content.style"
import { useGalleryContext, useUserContext } from "../../context/ContextProvider"
import { font_validation, gallery_name_validation, hex1_validation, hex2_validation, hex3_validation } from "./utils/inputValidation"

function GalleryForm() {
	// load context
	const { user } = useUserContext()
	const { gallery } = useGalleryContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onClear, onReset, onSubmit } =
		useGalleryForm(handleSuccess, handleError)

	return (
		<Form onSubmit={onSubmit} noValidate autoComplete="off">
			<FormRow>
				<ContentBlockHeader>Gallery Details</ContentBlockHeader>
			</FormRow>

			<FormRow>
				<InputGroup
					{...gallery_name_validation}
					value={formData.gallery_name}
					onChange={onChange}
				/>
			</FormRow>

			<FormRow>
				<ImageUpload
					formData={formData}
					setFormData={setFormData}
					defaultImage={
						gallery?.img_URL || initialGalleryData.img_URL
					}
					label="Thumbnail Image"
				/>
			</FormRow>

			<FormRow>
				<InputGroup {...hex1_validation} value={formData.hex1} onChange={onChange} />
				<InputGroup {...hex2_validation} value={formData.hex2} onChange={onChange} />
				<InputGroup {...hex3_validation} value={formData.hex3} onChange={onChange} />
			</FormRow>

			<FormRow>
				<ControlGroup {...font_validation} value={formData.font} onChange={onChange} />
			</FormRow>

			<FormRow>
				{(success || error) && (
					<Alert error={error !== undefined}>
						{error ? error.message : copy.formSuccess}
					</Alert>
				)}
			</FormRow>

			<FormRow>
				{user?.company && (
					<TransparentButton onClick={onReset}>
						<FontAwesomeIcon icon={faRefresh} />
						{" Reset"}
					</TransparentButton>
				)}
				<TransparentButton onClick={onClear}>
					<FontAwesomeIcon icon={faCancel} />
					{" Clear"}
				</TransparentButton>
				<TransparentButton type="submit">
					<FontAwesomeIcon icon={faArrowAltCircleRight} />
					{" Submit"}
				</TransparentButton>
			</FormRow>
		</Form>
	)
}

export { GalleryForm }
