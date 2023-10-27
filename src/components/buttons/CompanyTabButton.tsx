import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { CompanyForm } from "../forms/CompanyForm"
import { initialCompanyData } from "../../data/initial-data"
import { useUserContext } from "../../context/ContextProvider"
import { ButtonTitle, TabButton } from "../../styles/components/buttons.style"

function CompanyTabButton() {
	const { user } = useUserContext()
	// button shows company name or "new company"
	// if no user, do not render
	if (user?.company) {
		return (
			<Modal
				button={
					<TabButton>
						<ButtonTitle>
							{user.company.company_name}
						</ButtonTitle>
						<FontAwesomeIcon icon={faGear} />
					</TabButton>
				}
				content={
					// eslint-disable-next-line react/jsx-no-undef
					<CompanyForm
						initialData={{
							...user.company,
							user_id: user.user_id,
						}}
					/>
				}
			/>
		)
	} else if (user) {
		return (
			<Modal
				button={
					<TabButton>
						<ButtonTitle>New Company</ButtonTitle>
						<FontAwesomeIcon icon={faPlus} />
					</TabButton>
				}
				content={
					<CompanyForm
						initialData={{
							...initialCompanyData,
							user_id: user.user_id,
						}}
					/>
				}
			/>
		)
	}
	return <></>
}

export { CompanyTabButton }
