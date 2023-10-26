import React, {
	ChangeEvent,
	PropsWithChildren,
	SyntheticEvent,
	useState,
} from "react"

import { TransparentButton } from "../../styles/components/buttons.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"
import { Form, FormColumn, FormRow } from "../../styles/components/forms.style"
import { ContentBlockHeader } from "../../styles/components/content.style"
import { ICompany } from "../../interfaces/models"
import { ImageUpload } from "./utils/ImageUpload"
import { IApiResponse } from "../../interfaces/api"
import { useUserContext } from "../../context/ContextProvider"
import { createCompany, updateCompany } from "../../services/companies.service"
import { initialCompanyData } from "../../data/initial-data"

interface ComponentProps {
	initialData: ICompany
}

function CompanyForm2({ initialData }: PropsWithChildren<ComponentProps>) {
	// context
	const { userMetadata, setUserMetadata } = useUserContext()

	// state
	const [formData, setFormData] = useState<ICompany>(initialData)

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onClear(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData({ ...initialCompanyData, user_id: initialData.user_id })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(initialData)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		console.log(formData)
		// call API
		const response: IApiResponse = userMetadata?.company
			? await updateCompany(formData)
			: await createCompany(formData)
		// update context
		if (response.data) {
			if (userMetadata) {
				setUserMetadata({ ...userMetadata, company: response.data })
			}
		}
		if (response.error) {
			console.log(response.error)
		}
	}

	return (
		<Form onSubmit={onSubmit}>
			<FormRow>
				<ContentBlockHeader>Company Details</ContentBlockHeader>
			</FormRow>
			<FormRow>
				<FormColumn>
					<label htmlFor="company_name">Company Name</label>
					<input
						name="company_name"
						type="text"
						placeholder="Your company's name"
						value={formData.company_name}
						onChange={onChange}
					/>
				</FormColumn>
				<FormColumn>
					<ImageUpload
						formData={formData}
						setFormData={setFormData}
						defaultImage={initialData.img_URL}
					/>
				</FormColumn>
			</FormRow>

			<FormRow>
				<ContentBlockHeader>Public Links</ContentBlockHeader>
			</FormRow>
			<FormRow>
				<FormColumn>
					<label htmlFor="website_URL">Website</label>
					<input
						name="website_URL"
						type="text"
						placeholder="Paste URL here"
						value={formData.website_URL}
						onChange={onChange}
					/>
					<label htmlFor="youtube_URL">YouTube</label>
					<input
						name="youtube_URL"
						type="text"
						placeholder="Paste URL here"
						value={formData.youtube_URL}
						onChange={onChange}
					/>
					<label htmlFor="instagram_URL">Instagram</label>
					<input
						name="instagram_URL"
						type="text"
						placeholder="Paste URL here"
						value={formData.instagram_URL}
						onChange={onChange}
					/>
				</FormColumn>
				<FormColumn>
					<label htmlFor="facebook_URL">Facebook</label>
					<input
						name="facebook_URL"
						type="text"
						placeholder="Paste URL here"
						value={formData.facebook_URL}
						onChange={onChange}
					/>
					<label htmlFor="vimeo_URL">Vimeo</label>
					<input
						name="vimeo_URL"
						type="text"
						placeholder="Paste URL here"
						value={formData.vimeo_URL}
						onChange={onChange}
					/>
					<label htmlFor="tiktok_URL">TikTok</label>
					<input
						name="tiktok_URL"
						type="text"
						placeholder="Paste URL here"
						value={formData.tiktok_URL}
						onChange={onChange}
					/>
				</FormColumn>
			</FormRow>

			<FormRow>
				<FormColumn></FormColumn>
			</FormRow>

			<FormRow>
				{userMetadata?.company && (
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

export { CompanyForm2 }
