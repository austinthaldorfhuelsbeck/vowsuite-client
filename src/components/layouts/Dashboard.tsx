import { MouseEvent, PropsWithChildren, SyntheticEvent, useState } from "react"

import { faPlus } from "@fortawesome/free-solid-svg-icons"

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
				<Form>
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
	// Handlers
	const handleClick = (e: MouseEvent) => {
		e.preventDefault()
		setVideo(undefined)
	}

	return (
		<>
			<StudioHeaderContainer>
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