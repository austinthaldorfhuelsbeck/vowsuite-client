import { MouseEvent } from "react"

import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { copy } from "../../data/app-constants"
import { GalleryList } from "../lists/GalleryList"
import { GalleryForm } from "../forms/GalleryForm"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import {
	DashboardHeader,
	GalleryHeaderContainer,
	SidebarContainer,
	SidebarSection,
} from "../../styles/layouts/dashboard-layout.style"
import {
	ButtonTitle,
	TabButton,
	TransparentButton,
} from "../../styles/components/buttons.style"
import { NavProfileImg } from "../../styles/components/nav-bar.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Divider } from "../../styles/components/util.style"

function CompanyTabButton() {
	// Context
	const { user } = useUserContext()
	const { setGallery } = useGalleryContext()
	// button shows company name or "new company"
	return (
		<TabButton onClick={() => setGallery(undefined)}>
			<NavProfileImg src={user?.company?.img_URL} />
			<ButtonTitle>
				{user ? user.company.company_name : copy.companyTabNew}
			</ButtonTitle>
		</TabButton>
	)
}

function Sidebar() {
	// Context
	const { setGallery } = useGalleryContext()
	// Handlers
	const onClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setGallery(undefined)
	}

	return (
		<SidebarContainer>
			<CompanyTabButton />
			<Divider />
			<SidebarSection>
				<GalleryHeaderContainer>
					<DashboardHeader>{copy.sidebarHeader}</DashboardHeader>
					<Modal
						button={
							<TransparentButton onClick={onClick}>
								<FontAwesomeIcon icon={faPlus} />
							</TransparentButton>
						}
						content={<GalleryForm />}
					/>
				</GalleryHeaderContainer>
				<GalleryList />
			</SidebarSection>
		</SidebarContainer>
	)
}

export { Sidebar }
