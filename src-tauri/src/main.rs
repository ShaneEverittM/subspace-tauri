#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::convert::TryInto;
use std::string::ToString;

use basis::Matrix;
use serde::Serialize;
use serde_repr::Serialize_repr;

#[derive(Serialize_repr)]
#[repr(u8)]
pub enum ApiErrorKind {
    BasisError,
    InvalidInput,
}

#[derive(Serialize)]
pub struct ApiError {
    kind: ApiErrorKind,
    msg: String,
}

// TODO: Fix once Basis changes to `thiserror`
impl From<anyhow::Error> for ApiError {
    fn from(e: anyhow::Error) -> Self {
        ApiError {
            kind: ApiErrorKind::InvalidInput,
            msg: e.to_string(),
        }
    }
}

#[tauri::command]
pub fn add(v1: Vec<Vec<i32>>, v2: Vec<Vec<i32>>) -> Result<Vec<Vec<i32>>, ApiError> {
    Matrix::add(&v2.try_into()?, &v1.try_into()?)
        .map(|m| (*m).clone())
        .map_err(|e| ApiError {
            kind: ApiErrorKind::InvalidInput,
            msg: e.to_string(),
        })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
