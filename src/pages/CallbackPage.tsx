import { useAuth0 } from "@auth0/auth0-react"

import { GalleryHeader } from "../styles/layouts/gallery-layout.style"
import { DashboardSubheader } from "../styles/layouts/dashboard-layout.style"

function CallbackPage() {
	const { error } = useAuth0()

	return error ? (
		<>
			<GalleryHeader id="page-title">Error</GalleryHeader>
			<DashboardSubheader id="page-description">
				{error.message}
			</DashboardSubheader>
		</>
	) : (
		<></>
	)
}

export { CallbackPage }
