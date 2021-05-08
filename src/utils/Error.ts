/**
 * Represents the types of errors that calling `tauri::invoke()` can produce.
 *
 * @privateRemarks
 *
 * Must be 0 indexed numeric enumeration, since the serialized data coming from the backend depends
 * on the `#repr[u8]` serde tag.
 */
export enum ApiErrorKind {
    BasisError,
    InvalidInput
}

/**
 * Represents an error caused by calling `tauri::invoke()`
 *
 * @privateRemarks
 *
 * Must conform to the type `ApiError` in `main.rs`
 */
export interface ApiError {
    kind: ApiErrorKind,
    msg: string
}

/**
 * Response to a backend error
 * @param e The error
 */
export function handleError(e: ApiError): void {
    switch (e.kind) {
        case ApiErrorKind.BasisError:
            console.log('Basis Error: ' + e.msg);
            break;
        case ApiErrorKind.InvalidInput:
            console.log('Invalid Input: ' + e.msg);
            break;
        default:
            console.log(e);
            console.log('Default');
    }
}

