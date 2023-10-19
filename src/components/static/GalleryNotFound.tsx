import React from "react"

import { faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../data/app-constants"
import { BigIcon } from "../../styles/components/util.style"
import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content.style"

function GalleryNotFound() {
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

export { GalleryNotFound }
