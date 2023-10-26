import React, { SyntheticEvent, useEffect } from "react"

import { FormProvider, useForm } from "react-hook-form"

import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

import { InputGroup } from "./InputGroups"
import { copy } from "../../data/app-constants"
import { ICompany } from "../../interfaces/models"
import { initialCompanyData } from "../../data/initial-data"
import { Alert } from "../../styles/components/content.style"
import { useUserContext } from "../../context/ContextProvider"
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
import { useStatus } from "../../hooks/useStatus"
import { TransparentButton } from "../../styles/components/buttons.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, FormRow } from "../../styles/components/forms.style"

function CompanyForm() {
	// context
	const { userMetadata } = useUserContext()
	const { success, error, handleClear } = useStatus()
	// state
	const methods = useForm({ defaultValues: initialCompanyData })
	// handlers
	function handleReset(data: ICompany) {
		methods.reset(data)
		handleClear()
	}
	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault()
	}
	// const handleSubmit = methods.handleSubmit(async (formData: ICompany) => {
	// 	// call API
	// 	const response: IApiResponse = userMetadata?.company
	// 		? await updateCompany({
	// 				...formData,
	// 				company_id: userMetadata.company.company_id,
	// 		  })
	// 		: await createCompany(formData)
	// 	// returns a company
	// 	if (response.data) {
	// 		// update context
	// 		if (userMetadata) {
	// 			setUserMetadata({ ...userMetadata, company: response.data })
	// 		}
	// 		// update success banner
	// 		setSuccess(true)
	// 		setTimeout(setSuccess, 3000, false)
	// 	}
	// 	if (response.error) {
	// 		setError(response.error)
	// 		setTimeout(setError, 3000, undefined)
	// 	}
	// })

	// determine initial form data from context
	useEffect(() => {
		// load initial company data with user_id if it exists
		if (userMetadata?.user_id) {
			// load company data if the user has a company
			methods.reset(
				userMetadata.company
					? {
							...userMetadata.company,
							user_id: userMetadata.user_id,
					  }
					: {
							...initialCompanyData,
							user_id: userMetadata.user_id,
					  },
			)
		}
	}, [methods, userMetadata])

	return (
		<>
			<FormProvider {...methods}>
				<Form onSubmit={handleSubmit} noValidate autoComplete="off">
					<InputGroup {...company_name_validation} />
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
					<FormRow>
						{userMetadata?.company && (
							<TransparentButton
								onClick={() =>
									handleReset({
										...userMetadata.company,
										user_id: userMetadata.user_id,
									})
								}
							>
								<FontAwesomeIcon icon={faRefresh} />
								{" Reset"}
							</TransparentButton>
						)}
						<TransparentButton
							onClick={() => handleReset(initialCompanyData)}
						>
							<FontAwesomeIcon icon={faCancel} />
							{" Clear"}
						</TransparentButton>
						<TransparentButton type="submit">
							<FontAwesomeIcon icon={faArrowAltCircleRight} />
							{" Submit"}
						</TransparentButton>
					</FormRow>
				</Form>
			</FormProvider>
		</>
	)
}

export { CompanyForm }
