import React, {
	Dispatch,
	PropsWithChildren,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"

import { useAuth0 } from "@auth0/auth0-react"

import { getUserByEmail } from "../services/vs-api/users.service"
import { IGallery, IUser, IVideo } from "../interfaces/models"

// DEFINE INTERFACES
interface IUserContext {
	user: IUser | undefined
	setUser: Dispatch<SetStateAction<IUser | undefined>>
}
const IUserContextState = {
	user: undefined,
	setUser: () => {},
}
interface IGalleryContext {
	gallery: IGallery | undefined
	setGallery: Dispatch<SetStateAction<IGallery | undefined>>
}
const IGalleryContextState = {
	gallery: undefined,
	setGallery: () => {},
}
interface IVideoContext {
	video: IVideo | undefined
	setVideo: Dispatch<SetStateAction<IVideo | undefined>>
}
const IVideoContextState = {
	video: undefined,
	setVideo: () => {},
}

// DEFINE CONTEXTS
// User
const UserContext = createContext<IUserContext>(IUserContextState)
function useUserContext() {
	const user = useContext(UserContext)
	if (user === undefined) {
		throw new Error("useUserContext must be used with a UserContext")
	}
	return user
}
// Gallery
const GalleryContext = createContext<IGalleryContext>(IGalleryContextState)
function useGalleryContext() {
	const gallery = useContext(GalleryContext)
	if (gallery === undefined) {
		throw new Error("useGalleryContext must be used with a GalleryContext")
	}
	return gallery
}
// Video
const VideoContext = createContext<IVideoContext>(IVideoContextState)
function useVideoContext() {
	const video = useContext(VideoContext)
	if (video === undefined) {
		throw new Error("useVideoContext must be used with a VideoContext")
	}
	return video
}

// LOAD USER AND BUILD PROVIDER

interface ComponentProps {
	children: ReactNode
}
function ContextProvider({ children }: PropsWithChildren<ComponentProps>) {
	const userMetadata = useAuth0().user
	const [user, setUser] = useState<IUser | undefined>(undefined)
	const [gallery, setGallery] = useState<IGallery | undefined>(undefined)
	const [video, setVideo] = useState<IVideo | undefined>(undefined)

	// load initial user metadata
	useEffect(() => {
		const getUserResponse = async (email: string) => {
			const userResponse = await getUserByEmail(email)
			setUser(userResponse.data)
			setGallery(undefined)
		}
		if (userMetadata?.email) getUserResponse(userMetadata.email)
	}, [userMetadata])

	if (!user) return <>{children}</>

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<GalleryContext.Provider value={{ gallery, setGallery }}>
				<VideoContext.Provider value={{ video, setVideo }}>
					{children}
				</VideoContext.Provider>
			</GalleryContext.Provider>
		</UserContext.Provider>
	)
}

export { useUserContext, useGalleryContext, useVideoContext, ContextProvider }
