import {
	MouseEvent,
	PropsWithChildren,
	SyntheticEvent,
	useEffect,
	useState,
} from "react"

import {
	faExternalLinkSquareAlt,
	faPlus,
} from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { VideoList } from "../lists/VideoList"
import { VideoForm } from "../forms/VideoForm"
import { useStatus } from "../../hooks/useStatus"
import { CompanyForm } from "../forms/CompanyForm"
import { NotFoundPage } from "../../pages/NotFoundPage"
import {
	ICompany,
	ICompanyColor,
	IGallery,
	IUser,
} from "../../interfaces/models"
import { formatGreeting } from "../../services/util.service"
import { BannerActions } from "../forms/utils/BannerActions"
import { Form, FormColumn, FormRow } from "../../styles/components/forms.style"
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
import { useCompanyForm } from "../../hooks/useCompanyForm"
import { listCompanyColors } from "../../services/vs-api/companies.service"
import { IApiResponse } from "../../interfaces/api"

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
	const useCompanySection = useCompanyForm(handleSuccess, handleError)

	// Constants
	const now: Date = new Date()
	const greeting: string = formatGreeting(now, user.user_name)

	// State
	const [colors, setColors] = useState<(ICompanyColor | undefined)[]>([])

	// Handlers
	// reset/submit all forms at once
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		useCompanySection.onReset(e)
	}
	function onSubmit(e: SyntheticEvent) {
		useCompanySection.onSubmit(e)
	}

	// Props
	const bannerProps = {
		success,
		error,
		onReset,
		onSubmit,
	}

	// Effects
	useEffect(() => {
		async function listColors(company: ICompany) {
			const response: IApiResponse = await listCompanyColors(
				company.company_id,
			)
			setColors(response.data)
		}
		if (user?.company) listColors(user.company)
	}, [user])

	return (
		<>
			<StudioHeaderContainer>
				<DashboardHeader>{greeting}</DashboardHeader>
				<BannerActions {...bannerProps} />
			</StudioHeaderContainer>
			<DashboardBlock>
				<Form noValidate autoComplete="off">
					<FormRow>
						<CompanyForm {...useCompanySection} />
					</FormRow>
				</Form>
			</DashboardBlock>
			<DashboardBlock>
				<DashboardHeader>Debugging:</DashboardHeader>
				<pre>{JSON.stringify(user, null, "\t")}</pre>
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
		<NotFoundPage />
	)
}

export { Dashboard }
