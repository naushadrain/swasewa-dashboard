<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DoctorItemController;
use App\Http\Controllers\MedicineItemController;
use App\Http\Controllers\ImageUploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\OtpSparrowController;



Route::post('register', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('doctoradd', [DoctorItemController::class, 'addDoctor']);
Route::get('showDoctor', [DoctorItemController::class, 'showDoctor']);
Route::post('addMedicine', [MedicineItemController::class, 'addMedicine']);
Route::get('showMedicine', [MedicineItemController::class, 'showMedicine']);
Route::get('showImage', [ImageUploadController::class, 'showImage']);
Route::post('imageUpload', [ImageUploadController::class, 'store']);

# Aws SNS
Route::post('/send-otp', [OtpController::class, 'sendOtp']);
Route::post('/verify-otp', [OtpController::class, 'verifyOtp']);
Route::post('/resend-otp', [OtpController::class, 'resendOtp']);

# Sparrow SMS
Route::post('/send-otp-sparrow', [OtpSparrowController::class, 'sendOtp']);
Route::post('/verify-otp-sparrow', [OtpSparrowController::class, 'verifyOtp']);
Route::post('/resend-otp-sparrow', [OtpSparrowController::class, 'resendOtp']);
