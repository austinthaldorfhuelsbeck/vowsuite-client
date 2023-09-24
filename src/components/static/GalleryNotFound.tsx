// Dependencies
import * as React from "react"
import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content-block.style"
import { faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { BigIcon } from "../../styles/components/util.style"

export const GalleryNotFound: React.FC = () => {
	return (
		<>
			<ContentBlockHeader>Gallery Not Found</ContentBlockHeader>
			<ContentBlockSubheader>
				Click New Gallery to create your first gallery
			</ContentBlockSubheader>
			<BigIcon icon={faFileCircleQuestion} />
		</>
	)
}
