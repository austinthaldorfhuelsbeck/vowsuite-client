import { MouseEvent, PropsWithChildren, SyntheticEvent, useState } from "react"

import {
	faExternalLinkSquareAlt,
	faPlus,
} from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { VideoList } from "../lists/VideoList"
import { VideoForm } from "../forms/VideoForm"
import { useStatus } from "../../hooks/useStatus"
import { CompanyForm } from "../forms/CompanyForm"
import { InlineButton } from "../buttons/InlineButton"
import { NotFoundPage } from "../../pages/NotFoundPage"
import { IGallery, IUser } from "../../interfaces/models"
import { CompanyUrlsForm } from "../forms/CompanyUrlsForm"
import { formatGreeting } from "../../services/util.service"
import { BannerActions } from "../forms/utils/BannerActions"
import { CompanyColorsForm } from "../forms/CompanyColorsForm"
import {
	Form,
	FormColumn,
	FormLink,
	FormRow,
} from "../../styles/components/forms.style"
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

// Data Models
interface DashboardProps {
	user: IUser
}
interface GalleryEditorProps {
	gallery: IGallery
}

function UserDashboard({ user }: PropsWithChildren<DashboardProps>) {
	// Context
	const { success, error, handleSuccess, handleError } = useStatus()

	// State
	const [submit, setSubmit] = useState<
		SyntheticEvent<HTMLButtonElement> | undefined
	>()
	const [reset, setReset] = useState<
		SyntheticEvent<HTMLButtonElement> | undefined
	>()

	// Constants
	const now: Date = new Date()
	const greeting: string = formatGreeting(now, user.user_name)

	// Handlers
	function onSubmit(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setSubmit(e)
		setTimeout(setSubmit, 500, undefined)
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setReset(e)
		setTimeout(setReset, 500, undefined)
	}

	// Props
	const formProps = {
		submit,
		reset,
		handleSuccess,
		handleError,
	}
	const bannerProps = {
		onSubmit,
		onReset,
		success,
		error,
	}

	return (
		<>
			<StudioHeaderContainer>
				<DashboardHeader>{greeting}</DashboardHeader>
				<BannerActions {...bannerProps} />
			</StudioHeaderContainer>
			<DashboardBlock>
				<Form noValidate autoComplete="off">
					<FormRow>
						<FormColumn>
							<CompanyForm {...formProps} />
							<CompanyColorsForm {...formProps} />
						</FormColumn>
						<FormColumn>
							<CompanyUrlsForm {...formProps} />
						</FormColumn>
					</FormRow>
				</Form>
			</DashboardBlock>
		</>
	)
}

function GalleryEditor({ gallery }: PropsWithChildren<GalleryEditorProps>) {
	// Context
	const { setVideo } = useVideoContext()
	const { success, error, handleSuccess, handleError } = useStatus()

	// Constants
	const galleryUrl: string = `${baseUrls.galleryPage}/${gallery?.gallery_id}`

	// State
	const [submit, setSubmit] = useState<
		SyntheticEvent<HTMLButtonElement> | undefined
	>()
	const [reset, setReset] = useState<
		SyntheticEvent<HTMLButtonElement> | undefined
	>()

	// Handlers
	const onClick = (e: MouseEvent) => {
		e.preventDefault()
		setVideo(undefined)
	}
	function onSubmit(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setSubmit(e)
		setTimeout(setSubmit, 500, undefined)
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setReset(e)
		setTimeout(setReset, 500, undefined)
	}

	// Props
	const formProps = {
		submit,
		reset,
		handleSuccess,
		handleError,
	}
	const bannerProps = {
		onSubmit,
		onReset,
		success,
		error,
	}

	return (
		<>
			<StudioHeaderContainer>
				<DashboardHeader>Gallery Details</DashboardHeader>
				<FormRow>
					<FormLink
						to={galleryUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<TransparentButton>
							<FontAwesomeIcon icon={faExternalLinkSquareAlt} />
						</TransparentButton>
					</FormLink>
				</FormRow>
				<BannerActions {...bannerProps} />
			</StudioHeaderContainer>
			<DashboardBlock>
				<Form noValidate autoComplete="off">
					<GalleryForm {...formProps} />
				</Form>
			</DashboardBlock>
			<StudioHeaderContainer>
				<DashboardHeader>Videos</DashboardHeader>
				<Modal
					button={
						<InlineButton
							icon={faPlus}
							title="New Video"
							onClick={onClick}
						/>
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
		<NotFoundPage />
	)
}

export { Dashboard }
