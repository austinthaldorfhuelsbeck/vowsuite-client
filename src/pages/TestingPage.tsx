import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../context/ContextProvider"

function TestingPage() {
	const { user } = useUserContext()
	const { gallery } = useGalleryContext()
	const { video } = useVideoContext()
	return (
		<>
			<>Context:</>
			<>{JSON.stringify(user)}</>
			<>{JSON.stringify(gallery)}</>
			<>{JSON.stringify(video)}</>
		</>
	)
}

export { TestingPage }
