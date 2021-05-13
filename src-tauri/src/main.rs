#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use basis_api::*;

mod basis_api;
mod util;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
