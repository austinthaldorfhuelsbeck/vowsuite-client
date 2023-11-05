import React, { PropsWithChildren } from "react"

import { copy } from "../../data/app-constants"

import { Form, FormRow } from "../../styles/components/forms.style"
import {
	DashboardHeader,
	DashboardSubheader,
} from "../../styles/layouts/dashboard-layout.style"

interface ComponentProps {
	children: JSX.Element
}

function VideoDeleteForm({ children }: PropsWithChildren<ComponentProps>) {
	return (
		<Form noValidate autoComplete="off">
			<DashboardHeader>{copy.confirmDeleteHeader}</DashboardHeader>
			<DashboardSubheader>{copy.confirmDeleteMessage}</DashboardSubheader>
			<FormRow>{children}</FormRow>
		</Form>
	)
}

export { VideoDeleteForm }
