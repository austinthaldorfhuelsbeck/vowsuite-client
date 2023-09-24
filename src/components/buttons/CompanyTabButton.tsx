// Dependencies
import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../../context/ContextProvider"
// Components
import { Modal } from "../modals/Modal"
import { CompanyForm } from "../forms/CompanyForm"
// Styles
import { TabButton, ButtonTitle } from "../../styles/components/buttons.style"

export const CompanyTabButton: React.FC = () => {
	const { userMetadata } = useUserContext()
	return (
		<Modal
			button={
				<TabButton>
					<ButtonTitle>
						{userMetadata?.company
							? userMetadata.company.company_name
							: "New Company"}
					</ButtonTitle>
					<FontAwesomeIcon icon={faGear} />
				</TabButton>
			}
			content={<CompanyForm />}
		/>
	)
}
