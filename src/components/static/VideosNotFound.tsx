import React from "react"

import { faVideoSlash } from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../data/app-constants"
import { BigIcon } from "../../styles/components/util.style"
import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content.style"

function VideosNotFound() {
	return (
		<>
			<ContentBlockHeader>{copy.videosNotFoundHeader}</ContentBlockHeader>
			<ContentBlockSubheader>
				{copy.videosNotFoundSubheader}
			</ContentBlockSubheader>
			<BigIcon icon={faVideoSlash} />
		</>
	)
}

export { VideosNotFound }
