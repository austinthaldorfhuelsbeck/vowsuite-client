import { MouseEvent, useEffect } from "react"

import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../data/app-constants"
import { GalleryList } from "../lists/GalleryList"
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
import {
	createGallery,
	createGalleryColor,
} from "../../services/vs-api/galleries.service"
import {
	IBaseGallery,
	ICompanyColor,
	IGalleryColor,
} from "../../interfaces/models"
import { usePreview } from "../../hooks/usePreview"

function CompanyTabButton() {
	// Context
	const { user } = useUserContext()
	const { setGallery } = useGalleryContext()
	const { validUrl, getUrlFromAws } = usePreview()

	// Effects
	useEffect(() => {
		if (user?.company?.img_URL) getUrlFromAws(user.company.img_URL)
	})

	// button shows company name or "new company"
	return (
		<TabButton onClick={() => setGallery(undefined)}>
			{validUrl && <NavProfileImg src={validUrl} />}
			<ButtonTitle>
				{user?.company ? user.company.company_name : copy.companyTabNew}
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
		const now = new Date()
		async function createNewGallery(gallery: IBaseGallery) {
			try {
				const response: IApiResponse = await createGallery(gallery)
				setGallery(response.data)
				if (user) {
					// update context
					setUser({
						...user,
						galleries: [...user.galleries, response.data],
					})
					// create new gallery color objects
					user.company.colors.forEach(
						async (color: ICompanyColor, index: number) => {
							const newColor: IGalleryColor = {
								gallery_color_id: now.valueOf() + index,
								gallery_id: gallery.gallery_id,
								value: color.value,
								created_at: now,
								updated_at: now,
							}
							await createGalleryColor(newColor)
						},
					)
				}
			} catch (err) {
				console.error(err)
			}
		}
		if (user) {
			const newGallery: IBaseGallery = {
				user_id: user.user_id,
				gallery_name: "Untitled",
				gallery_id: now.valueOf(),
				created_at: now,
				updated_at: now,
				img_URL: "",
				font_id: 0,
			}
			createNewGallery(newGallery)
		}
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
