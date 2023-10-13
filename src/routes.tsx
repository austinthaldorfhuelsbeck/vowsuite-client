import { RouteObject } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { AuthenticationGuard } from "./components/common/AuthenticationGuard"
import { Studio } from "./components/layouts/Studio"
import { CallbackPage } from "./pages/CallbackPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { Gallery } from "./components/layouts/Gallery"
import { PageLayout } from "./components/layouts/PageLayout"

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
						<AuthenticationGuard component={Studio} />
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

export default routes
