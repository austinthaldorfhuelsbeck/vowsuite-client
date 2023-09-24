// Dependencies
import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useCompanyContext } from "../../context/ContextProvider"
// Components
import { Modal } from "../modals/Modal"
import { CompanyForm } from "../forms/CompanyForm"
// Styles
import { TabButton, ButtonTitle } from "../../styles/components/buttons.style"

export const CompanyTabButton: React.FC = () => {
	const { company } = useCompanyContext()
	// button shows company name or "new company"
	return (
		<Modal
			button={
				company ? (
					<TabButton>
						<ButtonTitle>{company.company_name}</ButtonTitle>
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
