import { PropsWithChildren, SyntheticEvent } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh, faSave } from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../../data/app-constants"
import { IAppError } from "../../../interfaces/api"
import { Alert, FormRow } from "../../../styles/components/forms.style"
import { TransparentButton } from "../../../styles/components/buttons.style"

interface BannerProps {
	success?: boolean
	error?: IAppError | undefined
}
export interface BannerActionsProps extends BannerProps {
	onReset?: (e: SyntheticEvent<any>) => void
	onSubmit?: (e: SyntheticEvent<any>) => any
}

function Banner({ success, error }: PropsWithChildren<BannerProps>) {
	return (
		<FormRow>
			{(success || error) && (
				<Alert error={error !== undefined} success={success}>
					{error ? error.message : copy.formSuccess}
				</Alert>
			)}
		</FormRow>
	)
}

function BannerActions({
	success,
	error,
	onReset,
	onSubmit,
}: PropsWithChildren<BannerActionsProps>) {
	return (
		<>
			<FormRow>
				{onReset && (
					<TransparentButton onClick={onReset}>
						<FontAwesomeIcon icon={faRefresh} />
					</TransparentButton>
				)}
				{onSubmit && (
					<TransparentButton onClick={onSubmit}>
						<FontAwesomeIcon icon={faSave} />
						{" Save"}
					</TransparentButton>
				)}
			</FormRow>
			<Banner success={success} error={error} />
		</>
	)
}

export { BannerActions, Banner }
