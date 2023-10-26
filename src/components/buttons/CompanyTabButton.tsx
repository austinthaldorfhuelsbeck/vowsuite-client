import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { CompanyForm } from "../forms/CompanyForm"
import { useUserContext } from "../../context/ContextProvider"
import { ButtonTitle, TabButton } from "../../styles/components/buttons.style"
import { CompanyForm2 } from "../forms/CompanyForm2"
import { initialCompanyData } from "../../data/initial-data"

function CompanyTabButton() {
	const { userMetadata } = useUserContext()
	// button shows company name or "new company"
	// if no user, do not render
	if (userMetadata?.company) {
		return (
			<Modal
				button={
					<TabButton>
						<ButtonTitle>
							{userMetadata.company.company_name}
						</ButtonTitle>
						<FontAwesomeIcon icon={faGear} />
					</TabButton>
				}
				content={
					<CompanyForm2
						initialData={{
							...userMetadata.company,
							user_id: userMetadata.user_id,
						}}
					/>
				}
			/>
		)
	} else if (userMetadata) {
		return (
			<Modal
				button={
					<TabButton>
						<ButtonTitle>New Company</ButtonTitle>
						<FontAwesomeIcon icon={faPlus} />
					</TabButton>
				}
				content={
					<CompanyForm2
						initialData={{
							...initialCompanyData,
							user_id: userMetadata.user_id,
						}}
					/>
				}
			/>
		)
	}
	return <></>
}

export { CompanyTabButton }
