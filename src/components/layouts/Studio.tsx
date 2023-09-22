// Dependencies
import * as React from "react"
import { ContextProvider } from "../../context/ContextProvider"
// Components
import { CompanyTabButton } from "../buttons/CompanyTabButton"
import { Sidebar } from "./Sidebar"
import { GalleryEditor } from "./GalleryEditor"
// Styles
import {
	StudioContainer,
	DashboardContainer,
} from "../../styles/layouts/dashboard-layout.style"

export const Studio: React.FC = () => {
	return (
		<ContextProvider>
			<StudioContainer>
				<CompanyTabButton />
				<DashboardContainer>
					<Sidebar />
					<GalleryEditor />
				</DashboardContainer>
			</StudioContainer>
		</ContextProvider>
	)
}
