// Dependencies
import * as React from "react"
import { useGalleryContext } from "../../context/ContextProvider"
import { baseUrls, copy } from "../../data/app-constants"
import {
	CardButton,
	CardContainer,
	CardText,
} from "../../styles/components/cards.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { Alert } from "../../styles/components/content.style"

export const GalleryLink: React.FC = () => {
	// load context
	const { gallery } = useGalleryContext()
	// construct URL
	const [url, setUrl] = React.useState<string | undefined>(undefined)
	React.useEffect(() => {
		if (gallery) {
			// function to copy text
			const copyText = async (text: string) => {
				try {
					await navigator.clipboard.writeText(text)
					setSuccess(true)
				} catch (err) {
					console.error("Failed to copy: ", err)
				}
			}
			// construct url and copy
			setUrl(`${baseUrls.galleryPage}/${gallery.gallery_id}`)
			if (url) copyText(url)
		}
	}, [gallery, url])
	// success banner
	const [success, setSuccess] = React.useState<boolean>(false)

	return gallery ? (
		<>
			<CardContainer>
				{/* <CardButton onClick={handleClick}>
					{<FontAwesomeIcon icon={faLink} />}
				</CardButton> */}
				<CardText>{url}</CardText>
			</CardContainer>
			{success && <Alert error={false}>{copy.linkCopySuccess}</Alert>}
		</>
	) : (
		<CardText>No gallery found!</CardText>
	)
}
