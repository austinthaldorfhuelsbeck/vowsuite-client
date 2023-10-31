import { MouseEvent, PropsWithChildren } from "react"

import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { VideoList } from "../lists/VideoList"
import { VideoForm } from "../forms/VideoForm"
import { CompanyForm } from "../forms/CompanyForm"
import { InlineButton } from "../buttons/InlineButton"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../context/ContextProvider"
import {
	DashboardBlock,
	DashboardContainer,
	DashboardHeader,
	GalleryHeaderContainer,
} from "../../styles/layouts/dashboard-layout.style"
import { IGallery, IUser } from "../../interfaces/models"
import { formatGreeting } from "../../services/util.service"
import { NotFoundPage } from "../../pages/NotFoundPage"

interface DashboardProps {
	user: IUser
}

interface GalleryEditorProps {
	gallery: IGallery
}

function UserDashboard({ user }: PropsWithChildren<DashboardProps>) {
	const now: Date = new Date()
	const greeting: string = formatGreeting(now, user.user_name)

	return (
		<>
			<GalleryHeaderContainer>
				<DashboardHeader>{greeting}</DashboardHeader>
			</GalleryHeaderContainer>
			<DashboardBlock>
				<CompanyForm />
			</DashboardBlock>
		</>
	)
}

function GalleryEditor({ gallery }: PropsWithChildren<GalleryEditorProps>) {
	// Context
	const { setVideo } = useVideoContext()
	// Handlers
	const handleClick = (e: MouseEvent) => {
		e.preventDefault()
		setVideo(undefined)
	}

	return (
		<>
			<GalleryHeaderContainer>
				<DashboardHeader>{gallery.gallery_name}</DashboardHeader>
				<Modal
					button={
						<InlineButton
							icon={faPlus}
							title="New Video"
							onClick={handleClick}
						/>
					}
					content={<VideoForm />}
				/>
			</GalleryHeaderContainer>
			<VideoList />
		</>
	)
}

function Dashboard() {
	// Context
	const { user } = useUserContext()
	const { gallery } = useGalleryContext()

	return user ? (
		<DashboardContainer>
			{gallery === undefined ? (
				<UserDashboard user={user} />
			) : (
				<GalleryEditor gallery={gallery} />
			)}
		</DashboardContainer>
	) : (
		<NotFoundPage />
	)
}

export { Dashboard }
