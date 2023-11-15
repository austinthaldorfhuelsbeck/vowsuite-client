import { MouseEvent, PropsWithChildren, useState } from "react"

import {
	faExternalLinkSquareAlt,
	faMinus,
	faPlus,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { VideoList } from "../lists/VideoList"
import { VideoForm } from "../forms/VideoForm"
import { CompanyForm } from "../forms/CompanyForm"
import { IGallery, IUser } from "../../interfaces/models"
import { formatGreeting } from "../../services/util.service"
import { FormColumn, FormRow } from "../../styles/components/forms.style"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../context/ContextProvider"
import {
	DashboardBlock,
	DashboardContainer,
	DashboardHeader,
	StudioHeaderContainer,
} from "../../styles/layouts/dashboard-layout.style"
import { GalleryForm } from "../forms/GalleryForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TransparentButton } from "../../styles/components/buttons.style"
import { baseUrls } from "../../data/app-constants"
import { Link } from "react-router-dom"
import { Loader } from "../../styles/layouts/page-layout.style"

// Data Models
interface DashboardProps {
	user: IUser
}
interface GalleryEditorProps {
	gallery: IGallery
}

// Components
function Debugger() {
	const { user } = useUserContext()
	const { gallery } = useGalleryContext()

	const [isUser, setIsUser] = useState<boolean>(false)
	const [isGallery, setIsGallery] = useState<boolean>(false)

	function toggleUser(c: boolean) {
		setIsUser(!c)
	}
	function toggleGallery(c: boolean) {
		setIsGallery(!c)
	}

	return (
		<DashboardBlock>
			<FormRow>
				<FormColumn>
					<DashboardHeader>
						<FontAwesomeIcon
							icon={isUser ? faMinus : faPlus}
							onClick={() => toggleUser(isUser)}
						/>
						User
					</DashboardHeader>
					{isUser && <pre>{JSON.stringify(user, null, "\t")}</pre>}
				</FormColumn>
				<FormColumn>
					<DashboardHeader>
						<FontAwesomeIcon
							icon={isGallery ? faMinus : faPlus}
							onClick={() => toggleGallery(isGallery)}
						/>
						Gallery
					</DashboardHeader>
					{isGallery && (
						<pre>{JSON.stringify(gallery, null, "\t")}</pre>
					)}
				</FormColumn>
			</FormRow>
		</DashboardBlock>
	)
}

function UserDashboard({ user }: PropsWithChildren<DashboardProps>) {
	// Constants
	const now: Date = new Date()
	const greeting: string = formatGreeting(now, user.user_name)

	return (
		<>
			<StudioHeaderContainer>
				<DashboardHeader>{greeting}</DashboardHeader>
			</StudioHeaderContainer>
			{user.company === undefined && (
				<DashboardBlock>
					<DashboardHeader>Welcome to Vowsuite.</DashboardHeader>
					<p>Let us know some details about your company.</p>
				</DashboardBlock>
			)}
			<DashboardBlock>
				<CompanyForm company={user.company} />
			</DashboardBlock>
		</>
	)
}

function GalleryEditor({ gallery }: PropsWithChildren<GalleryEditorProps>) {
	// Context
	const { setVideo } = useVideoContext()

	// Constants
	const galleryUrl: string = `${baseUrls.galleryPage}/${gallery?.gallery_id}`

	// Handlers
	const onClick = (e: MouseEvent) => {
		e.preventDefault()
		setVideo(undefined)
	}

	return (
		<>
			<StudioHeaderContainer>
				<FormRow>
					<Link
						to={galleryUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<TransparentButton>
							{"View Gallery "}
							<FontAwesomeIcon icon={faExternalLinkSquareAlt} />
						</TransparentButton>
					</Link>
				</FormRow>
			</StudioHeaderContainer>
			<DashboardBlock>
				<GalleryForm gallery={gallery} />
			</DashboardBlock>
			<StudioHeaderContainer>
				<DashboardHeader>Videos</DashboardHeader>
				<Modal
					button={
						<TransparentButton onClick={onClick}>
							<FontAwesomeIcon icon={faPlus} />
							{" New Video"}
						</TransparentButton>
					}
					content={<VideoForm />}
				/>
			</StudioHeaderContainer>
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
			<Debugger />
			{gallery === undefined ? (
				<UserDashboard user={user} />
			) : (
				<GalleryEditor gallery={gallery} />
			)}
		</DashboardContainer>
	) : (
		<Loader icon={faSpinner} />
	)
}

export { Dashboard }
