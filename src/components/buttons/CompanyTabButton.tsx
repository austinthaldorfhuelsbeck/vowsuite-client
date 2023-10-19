import React, { PropsWithChildren } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { useUserContext } from "../../context/ContextProvider"
import { ButtonTitle, TabButton } from "../../styles/components/buttons.style"
import { ICompany } from "src/interfaces/models"
import { CompanyForm } from "../forms/CompanyForm"

type ButtonProps = {
	company: ICompany
}

const NamedButton = ({ company }: PropsWithChildren<ButtonProps>) => {
	return (
		<TabButton>
			<ButtonTitle>{company.company_name}</ButtonTitle>
			<FontAwesomeIcon icon={faGear} />
		</TabButton>
	)
}

const GenericButton = () => {
	return (
		<TabButton>
			<ButtonTitle>New Company</ButtonTitle>
			<FontAwesomeIcon icon={faPlus} />
		</TabButton>
	)
}

function CompanyTabButton() {
	// load context
	const { userMetadata } = useUserContext()

	// button shows company name or "new company"
	return (
		<Modal
			button={
				userMetadata?.company ? (
					<NamedButton company={userMetadata.company} />
				) : (
					<GenericButton />
				)
			}
			content={<CompanyForm />}
		/>
	)
}

export { CompanyTabButton }
