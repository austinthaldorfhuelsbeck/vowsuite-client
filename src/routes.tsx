import { RouteObject } from "react-router-dom"

import { LandingPage } from "./pages/LandingPage"
import { CallbackPage } from "./pages/CallbackPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { Gallery } from "./components/layouts/Gallery"
import { PageLayout } from "./components/layouts/PageLayout"
import { AuthenticationGuard } from "./components/common/AuthenticationGuard"
import { StudioContainer } from "./styles/layouts/dashboard-layout.style"
import { Sidebar } from "./components/layouts/Sidebar"
import { Dashboard } from "./components/layouts/Dashboard"

const routes: RouteObject[] = [
	{
		path: "/",
		element: (
			<PageLayout>
				<LandingPage />
			</PageLayout>
		),
	},
	{
		children: [
			{
				path: "studio",
				element: (
					<PageLayout>
						<StudioContainer>
							<AuthenticationGuard component={Sidebar} />
							<AuthenticationGuard component={Dashboard} />
						</StudioContainer>
					</PageLayout>
				),
			},
			{
				path: "callback",
				element: <CallbackPage />,
			},
			{
				path: "galleries/:gallery_id",
				element: <Gallery />,
			},
			{
				path: "*",
				element: (
					<PageLayout>
						<NotFoundPage />
					</PageLayout>
				),
			},
		],
	},
]

export { routes }
