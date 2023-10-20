import React from "react"

import { Sidebar } from "./Sidebar"
import { GalleryEditor } from "./GalleryEditor"
import { CompanyTabButton } from "../buttons/CompanyTabButton"
import {
	DashboardContainer,
	StudioContainer,
} from "../../styles/layouts/dashboard-layout.style"

function Studio() {
	return (
		<StudioContainer>
			<CompanyTabButton />
			<DashboardContainer>
				<Sidebar />
				<GalleryEditor />
			</DashboardContainer>
		</StudioContainer>
	)
}

export { Studio }
