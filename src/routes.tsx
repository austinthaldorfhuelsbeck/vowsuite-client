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
import { Terms } from "./components/static/Terms"
import { Privacy } from "./components/static/Privacy"
import { TestingPage } from "./pages/TestingPage"

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
				path: "galleries/:gallery_id",
				element: <Gallery />,
			},
			{
				path: "terms",
				element: (
					<PageLayout>
						<Terms />
					</PageLayout>
				),
			},
			{
				path: "privacy",
				element: (
					<PageLayout>
						<Privacy />
					</PageLayout>
				),
			},
			{
				path: "callback",
				element: <CallbackPage />,
			},
			{
				path: "dev",
				element: <TestingPage />,
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
