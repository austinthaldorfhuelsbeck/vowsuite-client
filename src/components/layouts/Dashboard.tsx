import { MouseEvent, PropsWithChildren, SyntheticEvent, useState } from "react"

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
import { CompanyUrlsForm } from "../forms/CompanyUrlsForm"
import { CompanyColorsForm } from "../forms/CompanyColorsForm"
import { FormColumn, FormRow } from "../../styles/components/forms.style"
import { BannerActions } from "../forms/utils/BannerActions"

interface DashboardProps {
	user: IUser
}

interface GalleryEditorProps {
	gallery: IGallery
}

function UserDashboard({ user }: PropsWithChildren<DashboardProps>) {
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
		setTimeout(setSubmit, 1000, undefined)
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setReset(e)
		setTimeout(setReset, 1000, undefined)
	}

	// Props
	const props = {
		submit,
		reset,
	}

	return (
		<>
			<GalleryHeaderContainer>
				<DashboardHeader>{greeting}</DashboardHeader>
				<BannerActions onSubmit={onSubmit} onReset={onReset} />
			</GalleryHeaderContainer>
			<DashboardBlock>
				<FormRow>
					<FormColumn>
						<CompanyForm {...props} />
						<CompanyColorsForm {...props} />
					</FormColumn>
					<FormColumn>
						<CompanyUrlsForm {...props} />
					</FormColumn>
				</FormRow>
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
