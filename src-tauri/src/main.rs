#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use basis_api::*;

mod basis_api;
mod util;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            add_f64,
            add_i64,
            scalar_add_f64,
            scalar_add_i64,
            sub_f64,
            sub_i64,
            scalar_sub_f64,
            scalar_sub_i64,
            scalar_mul_f64,
            scalar_mul_i64,
            scalar_div_f64,
            scalar_div_i64,
            hadamard_product_f64,
            hadamard_product_i64,
            mul_f64,
            mul_i64,
            identity_i64,
            identity_f64,
            transpose_i64,
            transpose_f64,
            determinant_i64,
            determinant_f64,
            invert_i64,
            invert_f64
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
