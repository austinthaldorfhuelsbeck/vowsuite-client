import { copy } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { InputGroup } from "./utils/InputGroups"
import { useStatus } from "../../hooks/useStatus"
import { BannerActions } from "./utils/BannerActions"
import { useCompanyForm } from "../../hooks/useCompanyForm"
import { initialCompanyData } from "../../data/initial-data"
import { useUserContext } from "../../context/ContextProvider"
import { ContentBlockHeader } from "../../styles/components/content.style"
import { Form, FormColumn, FormRow } from "../../styles/components/forms.style"
import {
	company_name_validation,
	facebook_URL_validation,
	instagram_URL_validation,
	tiktok_URL_validation,
	vimeo_URL_validation,
	website_URL_validation,
	youtube_URL_validation,
} from "./utils/inputValidation"

function CompanyForm() {
	// context
	const { user } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onClear, onReset, onSubmit } =
		useCompanyForm(handleSuccess, handleError)

	// build props
	const bannerActionsProps = {
		success,
		error,
		onReset,
		onClear,
		onSubmit,
	}

	return (
		<Form onSubmit={onSubmit}>
			<ContentBlockHeader>{copy.companyFormHeader}</ContentBlockHeader>

			<FormRow>
				<InputGroup
					{...company_name_validation}
					value={formData.company_name}
					onChange={onChange}
				/>
			</FormRow>

			<FormRow>
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					defaultUrl={
						user?.company?.img_URL || initialCompanyData.img_URL
					}
					label="Company Logo"
					isCircle
				/>
			</FormRow>

			<FormRow>
				<ContentBlockHeader>
					{copy.companyFormSubheader}
				</ContentBlockHeader>
			</FormRow>
			<FormRow>
				<FormColumn>
					<InputGroup
						{...website_URL_validation}
						value={formData.website_URL}
						onChange={onChange}
					/>
					<InputGroup
						{...youtube_URL_validation}
						value={formData.youtube_URL}
						onChange={onChange}
					/>
					<InputGroup
						{...instagram_URL_validation}
						value={formData.instagram_URL}
						onChange={onChange}
					/>
				</FormColumn>
				<FormColumn>
					<InputGroup
						{...facebook_URL_validation}
						value={formData.facebook_URL}
						onChange={onChange}
					/>
					<InputGroup
						{...vimeo_URL_validation}
						value={formData.vimeo_URL}
						onChange={onChange}
					/>
					<InputGroup
						{...tiktok_URL_validation}
						value={formData.tiktok_URL}
						onChange={onChange}
					/>
				</FormColumn>
			</FormRow>

			<BannerActions {...bannerActionsProps} />
		</Form>
	)
}

export { CompanyForm }
