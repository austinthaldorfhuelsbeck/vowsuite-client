import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { CompanyForm } from "../forms/CompanyForm"
import { useUserContext } from "../../context/ContextProvider"
import { ButtonTitle, TabButton } from "../../styles/components/buttons.style"

function CompanyTabButton() {
	const { userMetadata } = useUserContext()
	// button shows company name or "new company"
	return (
		<Modal
			button={
				userMetadata?.company ? (
					<TabButton>
						<ButtonTitle>
							{userMetadata.company.company_name}
						</ButtonTitle>
						<FontAwesomeIcon icon={faGear} />
					</TabButton>
				) : (
					<TabButton>
						<ButtonTitle>New Company</ButtonTitle>
						<FontAwesomeIcon icon={faPlus} />
					</TabButton>
				)
			}
			content={<CompanyForm />}
		/>
	)
}

export { CompanyTabButton }
