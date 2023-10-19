import React from "react"

import {
	Form,
	FormRowContainer,
	FormContainer,
	FormImage,
	FormSubheader,
} from "src/styles/components/modal.style"
import { MessageBanner } from "./components/MessageBanner"
import { useCompanyForm } from "src/hooks/useCompanyForm"
import { FormActions } from "./components/FormActions"
import {
	company_name_validation,
	facebook_URL_validation,
	hex1_validation,
	hex2_validation,
	hex3_validation,
	img_URL_validation,
	instagram_URL_validation,
	tiktok_URL_validation,
	vimeo_URL_validation,
	website_URL_validation,
	youtube_URL_validation,
} from "./utils/inputValidation"
import { ColorGroup, InputGroup } from "./components/InputGroups"

function CompanyForm() {
	const { formData, onChange, onClear, onReset, onSubmit, success, error } =
		useCompanyForm()
	const {
		company_name,
		img_URL,
		website_URL,
		youtube_URL,
		instagram_URL,
		facebook_URL,
		vimeo_URL,
		tiktok_URL,
	} = formData
	const hex1: string = "#D1B2A2"
	const hex2: string = "#FFEDE4"
	const hex3: string = "#E8BAA3"

	return (
		<Form>
			<FormContainer>
				<FormSubheader>Company Details</FormSubheader>

				<InputGroup
					{...company_name_validation}
					value={company_name}
					onChange={onChange}
				/>
				<InputGroup
					{...img_URL_validation}
					value={img_URL}
					onChange={onChange}
				/>
				<FormImage src={img_URL} alt="Company profile" />

				<FormSubheader>Links</FormSubheader>
				<FormRowContainer>
					<InputGroup
						{...website_URL_validation}
						value={website_URL}
						onChange={onChange}
					/>
					<InputGroup
						{...youtube_URL_validation}
						value={youtube_URL}
						onChange={onChange}
					/>
				</FormRowContainer>
				<FormRowContainer>
					<InputGroup
						{...instagram_URL_validation}
						value={instagram_URL}
						onChange={onChange}
					/>
					<InputGroup
						{...facebook_URL_validation}
						value={facebook_URL}
						onChange={onChange}
					/>
				</FormRowContainer>

				<FormRowContainer>
					<InputGroup
						{...vimeo_URL_validation}
						value={vimeo_URL}
						onChange={onChange}
					/>
					<InputGroup
						{...tiktok_URL_validation}
						value={tiktok_URL}
						onChange={onChange}
					/>
				</FormRowContainer>

				<FormRowContainer>
					<ColorGroup
						{...hex1_validation}
						value={hex1}
						onChange={onChange}
					/>
					<ColorGroup
						{...hex2_validation}
						value={hex2}
						onChange={onChange}
					/>
					<ColorGroup
						{...hex3_validation}
						value={hex3}
						onChange={onChange}
					/>
				</FormRowContainer>

				<MessageBanner success={success} error={error} />

				<FormActions
					formData={formData}
					onClear={onClear}
					onReset={onReset}
					onSubmit={onSubmit}
				/>
			</FormContainer>
		</Form>
	)
}

export { CompanyForm }
