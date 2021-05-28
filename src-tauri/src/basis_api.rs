use basis::Matrix;
use serde::Serialize;
use serde_repr::Serialize_repr;

use crate::util::*;

#[derive(Serialize_repr)]
#[repr(u8)]
pub enum BasisErrorKind {
    InternalError,
}

#[derive(Serialize)]
pub struct BasisError {
    pub kind: BasisErrorKind,
    pub msg: String,
}

type BasisResult<T> = Result<T, BasisError>;

macro_rules! make_binary_functions {
    ($($func:ident),*) => {
        $(#[tauri::command]
        pub fn $func(
            m1: basis::Matrix<i32>,
            m2: basis::Matrix<i32>
        ) -> BasisResult<basis::Matrix<i32>> {
            crate::util::ResultInto::result_into(m1.$func(&m2))
        })*
    };
}

macro_rules! make_scalar_functions {
    ($($func:ident),*) => {
        $(#[tauri::command]
        pub fn $func(m: basis::Matrix<i32>, x: i32) -> basis::Matrix<i32> {
            m.$func(x)
        })*
    };
}

// Generate repetitive functions
make_binary_functions![add, sub, mul, hadamard_product];
make_scalar_functions![scalar_add, scalar_sub, scalar_mul, scalar_div];

#[tauri::command]
pub fn identity(n: usize) -> Matrix<i32> {
    Matrix::identity(n)
}

#[tauri::command]
pub fn invert(mut m: Matrix<i32>) -> BasisResult<Matrix<i32>> {
    m.invert().result_into()
}

#[tauri::command]
pub fn transpose(mut m: Matrix<i32>) -> Matrix<i32> {
    m.transpose();
    m
}

#[tauri::command]
pub fn determinant(mut m: Matrix<i32>) -> i32 {
    m.determinant()
}

