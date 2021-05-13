use crate::basis_api::{ApiError, ApiErrorKind};

impl From<anyhow::Error> for ApiError {
    fn from(e: anyhow::Error) -> Self {
        ApiError {
            kind: ApiErrorKind::BasisError,
            msg: e.to_string(),
        }
    }
}

/// Wrapper trait since it is impossible to implement foreign traits for foreign types.
pub trait ResultInto<T, E> {
    fn result_into(self) -> Result<T, E>;
}

// Auto impl it where possible.
impl<A, B, T, E> ResultInto<T, E> for Result<A, B>
    where
        A: Into<T>,
        B: Into<E>,
{
    fn result_into(self) -> Result<T, E> {
        self.map(|a| a.into()).map_err(|b| b.into())
    }
}
