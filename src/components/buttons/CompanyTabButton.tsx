// Dependencies
import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../../context/ContextProvider"
// Components
import { Modal } from "../modals/Modal"
import { CompanyForm } from "../forms/CompanyForm"
// Styles
import { TabButton, ButtonTitle } from "../../styles/components/buttons.style"

export const CompanyTabButton: React.FC = () => {
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
