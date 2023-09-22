// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { getUserByEmail } from "../services/users.service"
// Data
import { IGallery, IUser, IVideo } from "../interfaces/models"
// Components
import { PageLoader } from "../components/common/PageLoader"

// DEFINE INTERFACES
interface IUserContext {
	userMetadata: IUser | undefined
	setUserMetadata: React.Dispatch<React.SetStateAction<IUser | undefined>>
}
const IUserContextState = {
	userMetadata: undefined,
	setUserMetadata: () => {},
}
interface IGalleriesContext {
	galleries: (IGallery | undefined)[]
	setGalleries: React.Dispatch<React.SetStateAction<(IGallery | undefined)[]>>
}
const IGalleriesContextState = {
	galleries: [],
	setGalleries: () => {},
}
interface IGalleryContext {
	gallery: IGallery | undefined
	setGallery: React.Dispatch<React.SetStateAction<IGallery | undefined>>
}
const IGalleryContextState = {
	gallery: undefined,
	setGallery: () => {},
}
interface IVideoContext {
	video: IVideo | undefined
	setVideo: React.Dispatch<React.SetStateAction<IVideo | undefined>>
}
const IVideoContextState = {
	video: undefined,
	setVideo: () => {},
}

// DEFINE CONTEXTS

// Users
const UserContext = React.createContext<IUserContext>(IUserContextState)
export const useUserContext = () => {
	const user = React.useContext(UserContext)
	if (user === undefined) {
		throw new Error("useUserContext must be used with a UserContext")
	}
	return user
}
// Galleries
const GalleriesContext = React.createContext<IGalleriesContext>(
	IGalleriesContextState,
)
export const useGalleriesContext = () => React.useContext(GalleriesContext)
// Gallery
const GalleryContext =
	React.createContext<IGalleryContext>(IGalleryContextState)
export const useGalleryContext = () => {
	const gallery = React.useContext(GalleryContext)
	if (gallery === undefined) {
		throw new Error("useGalleryContext must be used with a GalleryContext")
	}
	return gallery
}
// Video
const VideoContext = React.createContext<IVideoContext>(IVideoContextState)
export const useVideoContext = () => {
	const video = React.useContext(VideoContext)
	if (video === undefined) {
		throw new Error("useVideoContext must be used with a VideoContext")
	}
	return video
}

// LOAD USER AND BUILD PROVIDER

interface ProviderProps {
	children: React.ReactNode
}
export const ContextProvider: React.FC<ProviderProps> = ({ children }) => {
	const { user, getAccessTokenSilently } = useAuth0()
	const [userMetadata, setUserMetadata] = React.useState<IUser | undefined>(
		undefined,
	)
	const [galleries, setGalleries] = React.useState<(IGallery | undefined)[]>(
		[],
	)
	const [gallery, setGallery] = React.useState<IGallery | undefined>(
		undefined,
	)
	const [video, setVideo] = React.useState<IVideo | undefined>(undefined)

	// load initial user metadata
	React.useEffect(() => {
		const getUserResponse = async (email: string) => {
			const audienceUrl = process.env.REACT_APP_AUTH0_AUDIENCE

			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: audienceUrl,
						scope: "read:current_user",
					},
				})

				const userResponse = await getUserByEmail(accessToken, email)

				setUserMetadata(userResponse.data)
				setGalleries(userResponse.data.galleries)
				setGallery(userResponse.data.galleries[0])
				// no video selected by default
			} catch (error: any) {
				throw new Error()
			}
		}

		if (user?.email) getUserResponse(user.email)
	}, [user, getAccessTokenSilently])

	if (!userMetadata) return <PageLoader />

	return (
		<UserContext.Provider value={{ userMetadata, setUserMetadata }}>
			<GalleriesContext.Provider value={{ galleries, setGalleries }}>
				<GalleryContext.Provider value={{ gallery, setGallery }}>
					<VideoContext.Provider value={{ video, setVideo }}>
						{children}
					</VideoContext.Provider>
				</GalleryContext.Provider>
			</GalleriesContext.Provider>
		</UserContext.Provider>
	)
}
