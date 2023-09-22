// Dependencies
import * as React from "react"
import { useGalleryContext } from "../../context/ContextProvider"
// Components
import { VideoList } from "../lists/VideoList"
// Styles
import {
	ContentBlockContainer,
	ContentBlockHeader,
} from "../../styles/components/content-block.style"

export const GalleryEditor: React.FC = () => {
	const { gallery } = useGalleryContext()

	if (gallery === undefined) return <span>Not found.</span>
	return (
		<ContentBlockContainer>
			<ContentBlockHeader>{gallery.gallery_name}</ContentBlockHeader>
			<VideoList />
		</ContentBlockContainer>
	)
}
