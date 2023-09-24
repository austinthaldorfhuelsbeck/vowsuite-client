// Dependencies
import * as React from "react"
import {
	useCompanyContext,
	useUserContext,
} from "../../context/ContextProvider"
// Data
import { ICompany } from "../../interfaces/models"
import { initialCompanyData } from "../../data/initial-data"
// Components
import { TextInputGroup } from "../input-groups/input-groups"
import { CompanySubmitButton } from "../buttons/api/CompanySubmitButton"
import { ClearButton } from "../buttons/api/ClearButton"
// Styles
import {
	ModalForm,
	ModalFormActionsContainer,
} from "../../styles/components/modal.style"

export const CompanyForm: React.FC = () => {
	// load context
	const { userMetadata } = useUserContext()
	const { company } = useCompanyContext()

	// create and set form state
	// add the user ID if possible
	const [formData, setFormData] = React.useState<ICompany>(initialCompanyData)
	React.useEffect(() => {
		if (company && userMetadata?.user_id) {
			// load company data
			setFormData({ ...company, user_id: userMetadata.user_id })
		} else if (userMetadata?.user_id) {
			setFormData({
				...initialCompanyData,
				user_id: userMetadata.user_id,
			})
		} else {
			setFormData(initialCompanyData)
		}
	}, [company]) // do ^ every time the company is changed

	// event handlers
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const handleClear = () =>
		setFormData(
			// tack on the user ID
			userMetadata?.user_id
				? { ...initialCompanyData, user_id: userMetadata.user_id }
				: initialCompanyData,
		)

	return (
		<ModalForm>
			{/* <span>{`User ID: ${formData.user_id}`}</span> */}
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
				<ClearButton onClear={handleClear} />
				<CompanySubmitButton formData={formData} />
			</ModalFormActionsContainer>
		</ModalForm>
	)
}
