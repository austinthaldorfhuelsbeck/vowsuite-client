import React, { useState } from "react"

import { FormProvider, useForm } from "react-hook-form"

import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

import { InputGroup } from "./InputGroups"
import { copy } from "../../data/app-constants"
import { ICompany } from "../../interfaces/models"
import { InlineButton } from "../buttons/InlineButton"
import { initialCompanyData } from "../../data/initial-data"
import { Alert } from "../../styles/components/content.style"
import { useUserContext } from "../../context/ContextProvider"
import { IApiResponse, IAppError } from "../../interfaces/api"
import { createCompany, updateCompany } from "../../services/companies.service"
import { Form, FormActionsContainer } from "../../styles/components/modal.style"
import {
	company_name_validation,
	facebook_URL_validation,
	img_URL_validation,
	instagram_URL_validation,
	tiktok_URL_validation,
	vimeo_URL_validation,
	website_URL_validation,
	youtube_URL_validation,
} from "./utils/inputValidation"

function CompanyForm() {
	// load context
	const { userMetadata, setUserMetadata } = useUserContext()
	// determine initial form data from context
	let initialFormData: ICompany = initialCompanyData
	if (userMetadata?.company && userMetadata?.user_id) {
		// load company data if the user has a company
		initialFormData = {
			...userMetadata.company,
			user_id: userMetadata.user_id,
		}
	} else if (userMetadata?.user_id) {
		// load initial company data if the user exists
		initialFormData = {
			...initialCompanyData,
			user_id: userMetadata.user_id,
		}
	}

	// state
	const methods = useForm({ defaultValues: initialFormData })
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<IAppError | undefined>(undefined)
	// handlers
	const handleClear = (data: ICompany) => {
		methods.reset(data)
		setSuccess(false)
		setError(undefined)
	}
	const handleSubmit = methods.handleSubmit(async (formData: ICompany) => {
		// call API
		const response: IApiResponse = userMetadata?.company
			? await updateCompany({
					...formData,
					company_id: userMetadata.company.company_id,
			  })
			: await createCompany(formData)
		// returns a company
		if (response.data) {
			// update context
			if (userMetadata) {
				setUserMetadata({ ...userMetadata, company: response.data })
			}
			// update success banner
			setSuccess(true)
			setTimeout(setSuccess, 3000, false)
		}
		if (response.error) {
			setError(response.error)
			setTimeout(setError, 3000, undefined)
		}
	})

	return (
		<FormProvider {...methods}>
			<Form
				onSubmit={(e: any) => e.preventDefault()}
				noValidate
				autoComplete="off"
			>
				<InputGroup {...company_name_validation} />
				<InputGroup {...img_URL_validation} />
				<InputGroup {...website_URL_validation} />
				<InputGroup {...youtube_URL_validation} />
				<InputGroup {...instagram_URL_validation} />
				<InputGroup {...facebook_URL_validation} />
				<InputGroup {...vimeo_URL_validation} />
				<InputGroup {...tiktok_URL_validation} />
				{(success || error) && (
					<Alert error={error !== undefined}>
						{error ? error.message : copy.formSuccess}
					</Alert>
				)}
				<FormActionsContainer>
					{userMetadata?.company && (
						<InlineButton
							icon={faRefresh}
							title="Reset"
							onClick={() => handleClear(initialFormData)}
						/>
					)}
					<InlineButton
						icon={faCancel}
						title="Clear"
						onClick={() => handleClear(initialCompanyData)}
					/>
					<InlineButton
						icon={faArrowAltCircleRight}
						title="Submit"
						onClick={handleSubmit}
					/>
				</FormActionsContainer>
			</Form>
		</FormProvider>
	)
}

export { CompanyForm }
