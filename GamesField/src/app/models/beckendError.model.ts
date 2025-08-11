export interface BackendError {
    message: string;
    errors?: Record<string, string>;
}