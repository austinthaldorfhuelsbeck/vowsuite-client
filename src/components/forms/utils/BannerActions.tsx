import { PropsWithChildren, SyntheticEvent } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../../data/app-constants"
import { IAppError } from "../../../interfaces/api"
import { Alert, FormRow } from "../../../styles/components/forms.style"
import { TransparentButton } from "../../../styles/components/buttons.style"

interface ComponentProps {
	success: boolean
	error: IAppError | undefined
	reset?: boolean
	onReset: (e: SyntheticEvent<any>) => void
	onClear: (e: SyntheticEvent<any>) => void
	onSubmit: (e: SyntheticEvent<any>) => Promise<void>
}

function BannerActions({
	success,
	error,
	reset,
	onReset,
	onClear,
	onSubmit,
}: PropsWithChildren<ComponentProps>) {
	return (
		<>
			<FormRow>
				{(success || error) && (
					<Alert error={error !== undefined} success={success}>
						{error ? error.message : copy.formSuccess}
					</Alert>
				)}
			</FormRow>

			<FormRow>
				{reset && (
					<TransparentButton onClick={onReset}>
						<FontAwesomeIcon icon={faRefresh} />
						{" Reset"}
					</TransparentButton>
				)}
				<TransparentButton onClick={onClear}>
					<FontAwesomeIcon icon={faCancel} />
					{" Clear"}
				</TransparentButton>
				<TransparentButton onClick={onSubmit}>
					<FontAwesomeIcon icon={faArrowAltCircleRight} />
					{" Submit"}
				</TransparentButton>
			</FormRow>
		</>
	)
}

export { BannerActions }
