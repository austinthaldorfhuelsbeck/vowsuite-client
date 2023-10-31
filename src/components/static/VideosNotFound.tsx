import React from "react"

import { faVideoSlash } from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../data/app-constants"
import { BigIcon } from "../../styles/components/util.style"
import {
	DashboardHeader,
	DashboardSubheader,
} from "../../styles/layouts/dashboard-layout.style"


function VideosNotFound() {
	return (
		<>
			<DashboardHeader>{copy.videosNotFoundHeader}</DashboardHeader>
			<DashboardSubheader>
				{copy.videosNotFoundSubheader}
			</DashboardSubheader>
			<BigIcon icon={faVideoSlash} />
		</>
	)
}

export { VideosNotFound }
