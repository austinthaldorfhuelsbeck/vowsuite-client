export interface IAppError {
    message: string
}

export interface IApiResponse {
    data: any
    error: IAppError | null
}