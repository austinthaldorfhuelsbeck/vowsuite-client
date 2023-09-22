// Dependencies
import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../../context/ContextProvider"
// Components
import { PageLoader } from "../common/PageLoader"
// Styles
import { TabButton, ButtonTitle } from "../../styles/components/buttons.style"

export const CompanyTabButton: React.FC = () => {
	const { userMetadata } = useUserContext()
	return userMetadata ? (
		<TabButton to={`/studio/company/${userMetadata.company.company_id}`}>
			<ButtonTitle>{userMetadata.company.company_name}</ButtonTitle>
			<FontAwesomeIcon icon={faGear} />
		</TabButton>
	) : (
		<PageLoader />
	)
}
