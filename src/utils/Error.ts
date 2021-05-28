/**
 * Represents the types of errors that calling `tauri::invoke()` can produce.
 *
 * @privateRemarks
 *
 * Must be 0 indexed numeric enumeration, since the serialized data coming from the backend depends
 * on the `#repr[u8]` serde tag.
 */
export enum BasisErrorKind {
    InternalError
}

/**
 * Represents an error caused by calling `tauri::invoke()`
 *
 * @privateRemarks
 *
 * Must conform to the type `ApiError` in `main.rs`
 */
export interface BasisError {
    kind: BasisErrorKind,
    msg: string
}

/**
 * Response to a backend error
 * @param e The error
 */
export function handleError(e: BasisError): void {
    switch (e.kind) {
        case BasisErrorKind.InternalError:
            console.log('Basis Error: ' + e.msg);
            break;
        default:
            console.log(e);
            console.log('Default');
    }
}

