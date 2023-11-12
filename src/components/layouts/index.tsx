import { MouseEvent, PropsWithChildren } from "react"

import {
	faExternalLinkSquareAlt,
	faPlus,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { VideoList } from "../lists/VideoList"
import { VideoForm } from "../forms/VideoForm"
import { CompanyForm } from "../forms/CompanyForm"
import { IGallery, IUser } from "../../interfaces/models"
import { formatGreeting } from "../../services/util.service"
import { Form, FormRow } from "../../styles/components/forms.style"
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
			{/* <DashboardBlock>
				<DashboardHeader>Debugging:</DashboardHeader>
				<pre>{JSON.stringify(user, null, "\t")}</pre>
			</DashboardBlock> */}
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
				<DashboardHeader>Gallery Details</DashboardHeader>
				<FormRow>
					<Link
						to={galleryUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<TransparentButton>
							<FontAwesomeIcon icon={faExternalLinkSquareAlt} />
						</TransparentButton>
					</Link>
				</FormRow>
			</StudioHeaderContainer>
			<DashboardBlock>
				<Form noValidate autoComplete="off">
					<GalleryForm gallery={gallery} />
				</Form>
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