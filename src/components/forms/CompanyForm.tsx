// Dependencies
import * as React from "react"
import {
	useCompanyContext,
	useUserContext,
} from "../../context/ContextProvider"
// Data
import { ICompany } from "../../interfaces/models"
import { initialCompanyData } from "../../utils/initial-data"
// Components
import { TextInputGroup } from "../input-groups/input-groups"
// Styles
import {
	ModalForm,
	ModalFormActionsContainer,
} from "../../styles/components/modal.style"
import { CompanySubmitButton } from "../buttons/CompanySubmitButton"

export const CompanyForm: React.FC = () => {
	// load context
	const { userMetadata } = useUserContext()
	const { company } = useCompanyContext()

	// create and set form state
	const [formData, setFormData] = React.useState<ICompany>(initialCompanyData)
	React.useEffect(() => {
		if (company) {
			// load company data
			setFormData(company)
		} else {
			// if not found, load initial data again
			setFormData(initialCompanyData)
		} // then add user ID
		const userId: number | undefined = userMetadata
			? userMetadata.user_id
			: undefined
		if (userId)
			// user could theoretically be undefined
			setFormData({
				...formData,
				user_id: userId,
			})
	}, [company]) // do ^ every time the company is changed (once)

	// event handlers
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const handleClear = () => setFormData(initialCompanyData)

	return (
		<ModalForm>
			<TextInputGroup
				id="company_name"
				title="Company Name"
				maxLength={40}
				onChange={handleChange}
				value={formData.company_name}
			/>
			<TextInputGroup
				id="img_URL"
				title="Logo URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.img_URL}
			/>
			<TextInputGroup
				id="website_URL"
				title="Website URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.website_URL}
			/>
			<TextInputGroup
				id="youtube_URL"
				title="Youtube URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.youtube_URL}
			/>
			<TextInputGroup
				id="instagram_URL"
				title="Instagram URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.instagram_URL}
			/>
			<TextInputGroup
				id="facebook_URL"
				title="Facebook URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.facebook_URL}
			/>
			<TextInputGroup
				id="vimeo_URL"
				title="Vimeo URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.vimeo_URL}
			/>
			<TextInputGroup
				id="tiktok_URL"
				title="TikTok URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.tiktok_URL}
			/>
			<ModalFormActionsContainer>
				<CompanySubmitButton
					formData={formData}
					handleClear={handleClear}
				/>
			</ModalFormActionsContainer>
		</ModalForm>
	)
}
