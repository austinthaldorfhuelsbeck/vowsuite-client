import { PropsWithChildren, SyntheticEvent } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCancel, faRefresh, faSave } from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../../data/app-constants"
import { IAppError } from "../../../interfaces/api"
import { Alert, FormRow } from "../../../styles/components/forms.style"
import { TransparentButton } from "../../../styles/components/buttons.style"

interface ComponentProps {
	success?: boolean
	error?: IAppError | undefined
	onReset?: (e: SyntheticEvent<any>) => void
	onClear?: (e: SyntheticEvent<any>) => void
	onSubmit?: (e: SyntheticEvent<any>) => any
}

function BannerActions({
	success,
	error,
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
				{onReset && (
					<TransparentButton onClick={onReset}>
						<FontAwesomeIcon icon={faRefresh} />
					</TransparentButton>
				)}
				{onClear && (
					<TransparentButton onClick={onClear}>
						<FontAwesomeIcon icon={faCancel} />
					</TransparentButton>
				)}
				{onSubmit && (
					<TransparentButton onClick={onSubmit}>
						<FontAwesomeIcon icon={faSave} />
					</TransparentButton>
				)}
			</FormRow>
		</>
	)
}

export { BannerActions }
