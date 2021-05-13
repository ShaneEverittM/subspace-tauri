use std::convert::TryInto;
use std::string::ToString;

use basis::Matrix;
use serde::Serialize;
use serde_repr::Serialize_repr;

use crate::util::*;

#[derive(Serialize_repr)]
#[repr(u8)]
pub enum ApiErrorKind {
    BasisError,
    _InvalidInput,
}

#[derive(Serialize)]
pub struct ApiError {
    pub kind: ApiErrorKind,
    pub msg: String,
}

#[tauri::command]
pub fn add(v1: Vec<Vec<i32>>, v2: Vec<Vec<i32>>) -> Result<Vec<Vec<i32>>, ApiError> {
    Matrix::add(&v2.try_into()?, &v1.try_into()?).result_into()
}
