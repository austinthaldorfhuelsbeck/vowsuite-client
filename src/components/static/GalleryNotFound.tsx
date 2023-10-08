// Dependencies
import * as React from "react"
import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content.style"
import { faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { BigIcon } from "../../styles/components/util.style"
import { copy } from "../../data/app-constants"

export const GalleryNotFound: React.FC = () => {
	return (
		<>
			<ContentBlockHeader>
				{copy.galleryNotFoundHeader}
			</ContentBlockHeader>
			<ContentBlockSubheader>
				{copy.galleryNotFoundSubheader}
			</ContentBlockSubheader>
			<BigIcon icon={faFileCircleQuestion} />
		</>
	)
}
