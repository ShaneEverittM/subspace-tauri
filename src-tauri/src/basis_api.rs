use basis::Matrix;
use paste::paste;
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
    (
        [ $($type:ty),+ ],
        $funcs:tt
    ) => { $(make_binary_functions!($type, $funcs);)* };
    (
        $type:ty,
        [ $($func:ident),* ]
    ) => {
        paste! {
            $(#[tauri::command]
            pub fn [<$func _$type>](
                m1: basis::Matrix<$type>,
                m2: basis::Matrix<$type>
            ) -> BasisResult<basis::Matrix<$type>> {
                crate::util::ResultInto::result_into(m1.$func(&m2))
            })*
       }
    };
}

macro_rules! make_scalar_functions {
    (
        [ $($type:ty),+ ],
        $funcs:tt
    ) => { $(make_scalar_functions!($type, $funcs);)* };
    (
        $type:ty,
        [ $($func:ident),* ]
    ) => {
        paste! {
            $(#[tauri::command]
            pub fn [<$func _$type>](
                m: basis::Matrix<$type>,
                x: $type
            ) -> basis::Matrix<$type> {
                m.$func(x)
            })*
       }
    };
}

make_binary_functions!([f64, i64], [add, sub, mul, hadamard_product]);
make_scalar_functions!([f64, i64], [scalar_add, scalar_sub, scalar_mul, scalar_div]);

#[tauri::command]
pub fn identity_i64(n: usize) -> Matrix<i64> {
    Matrix::identity(n)
}

#[tauri::command]
pub fn identity_f64(n: usize) -> Matrix<f64> {
    Matrix::identity(n)
}

#[tauri::command]
pub fn invert_i64(mut m: Matrix<i64>) -> BasisResult<Matrix<i64>> {
    m.invert().result_into()
}

#[tauri::command]
pub fn invert_f64(mut m: Matrix<f64>) -> BasisResult<Matrix<f64>> {
    m.invert().result_into()
}

#[tauri::command]
pub fn transpose_i64(mut m: Matrix<i64>) -> Matrix<i64> {
    m.transpose();
    m
}

#[tauri::command]
pub fn transpose_f64(mut m: Matrix<f64>) -> Matrix<f64> {
    m.transpose();
    m
}

#[tauri::command]
pub fn determinant_i64(mut m: Matrix<i64>) -> i64 {
    m.determinant()
}

#[tauri::command]
pub fn determinant_f64(mut m: Matrix<f64>) -> f64 {
    m.determinant()
}
