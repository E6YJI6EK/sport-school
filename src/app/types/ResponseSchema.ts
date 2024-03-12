export interface ResponseSchema {
    isSuccess?: boolean;
    isFailure?: boolean;
    isLoading?: boolean;
    message?: string;
    data?: any;
}