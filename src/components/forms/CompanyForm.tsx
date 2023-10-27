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
import { Alert, ContentBlockHeader } from "../../styles/components/content.style"
import { ICompany } from "../../interfaces/models"
import { ImageUpload } from "./utils/ImageUpload"
import { IApiResponse } from "../../interfaces/api"
import { useUserContext } from "../../context/ContextProvider"
import { createCompany, updateCompany } from "../../services/companies.service"
import { initialCompanyData } from "../../data/initial-data"
import { copy } from "../../data/app-constants"
import { useStatus } from "../../hooks/useStatus"
import { InputGroup } from "./InputGroups"
import { company_name_validation, facebook_URL_validation, instagram_URL_validation, tiktok_URL_validation, vimeo_URL_validation, website_URL_validation, youtube_URL_validation } from "./utils/inputValidation"

interface ComponentProps {
	initialData: ICompany
}

function CompanyForm({ initialData }: PropsWithChildren<ComponentProps>) {
	// context
	const { user, setUser } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()

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
		// call API
		const response: IApiResponse = user?.company
			? await updateCompany(formData)
			: await createCompany(formData)
		if (response.data) {
			// update context
			if (user) {
				setUser({ ...user, company: response.data })
			}
			// useStatus
			handleSuccess()
		}
		if (response.error) {
			// useStatus
			handleError(response.error)
		}
	}

	return (
		<Form onSubmit={onSubmit}>
			<FormRow>
				<ContentBlockHeader>Company Details</ContentBlockHeader>
			</FormRow>

			<FormRow>
				<InputGroup
					{...company_name_validation}
					value={formData.company_name}
                    onChange={onChange}
				/>
			</FormRow>

            <FormRow>	
                <ImageUpload
                    formData={formData}
                    setFormData={setFormData}
                    defaultImage={initialData.img_URL}
					label="Company Logo"
                />
			</FormRow>

			<FormRow>
				<ContentBlockHeader>Public Links</ContentBlockHeader>
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

export { CompanyForm }
