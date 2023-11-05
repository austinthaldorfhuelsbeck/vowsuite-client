import { MouseEvent } from "react"

import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { copy, defaultFonts, imagePaths } from "../../data/app-constants"
import { GalleryList } from "../lists/GalleryList"
import { GalleryForm } from "../forms/GalleryForm"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import {
	DashboardHeader,
	StudioHeaderContainer,
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
import { IApiResponse } from "../../interfaces/api"
import { createGallery } from "../../services/galleries.service"
import { IBaseGallery, IGallery } from "../../interfaces/models"

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
	const { user, setUser } = useUserContext()
	const { setGallery } = useGalleryContext()
	// Handlers
	function onClick(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		async function createNewGallery(gallery: IBaseGallery) {
			try {
				const response: IApiResponse = await createGallery(gallery)
				// update context
				setGallery(response.data)
				if (user)
					setUser({
						...user,
						galleries: [...user.galleries, response.data],
					})
			} catch (err) {
				console.error(err)
			}
		}
		if (user)
			createNewGallery({
				user_id: user.user_id,
				gallery_name: "Untitled",
				gallery_id: new Date().valueOf(),
				created_at: new Date(),
				updated_at: new Date(),
				img_URL: imagePaths.defaultUser,
				font_id: 0,
			})
	}

	return (
		<SidebarContainer>
			<CompanyTabButton />
			<Divider />
			<SidebarSection>
				<StudioHeaderContainer>
					<DashboardHeader>{copy.sidebarHeader}</DashboardHeader>
					<TransparentButton onClick={onClick}>
						<FontAwesomeIcon icon={faPlus} />
					</TransparentButton>
				</StudioHeaderContainer>
				<GalleryList />
			</SidebarSection>
		</SidebarContainer>
	)
}

export { Sidebar }
