#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use basis::Matrix;
use serde::Serialize;
use std::convert::TryInto;
use std::string::ToString;
use thiserror::Error;

#[derive(Debug, Error, Serialize)]
pub enum ApiError {
    #[error("{0}")]
    InvalidInput(String),
    #[error("Internal Error: {0}")]
    BasisError(String),
}

impl From<anyhow::Error> for ApiError {
    fn from(e: anyhow::Error) -> Self {
        ApiError::BasisError(e.to_string())
    }
}

#[tauri::command]
pub fn add(v1: Vec<Vec<i32>>, v2: Vec<Vec<i32>>) -> Result<Vec<Vec<i32>>, ApiError> {
    Matrix::add(&v2.try_into()?, &v1.try_into()?)
        .map(|m| (*m).clone())
        .map_err(|e| e.into())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
