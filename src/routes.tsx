import { RouteObject } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { AuthenticationGuard } from "./components/common/AuthenticationGuard"
import { Studio } from "./components/layouts/Studio"
import { CallbackPage } from "./pages/CallbackPage"
import { NotFoundPage } from "./pages/NotFoundPage"

const routes: RouteObject[] = [
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		children: [
			{
				path: "studio",
				element: <AuthenticationGuard component={Studio} />,
			},
			{
				path: "callback",
				element: <CallbackPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]

export default routes
