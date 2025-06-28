<?php

namespace App\Http\Controllers;

use App\Models\Otp;
use App\Models\OtpRecordTable;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class OtpSparrowController extends Controller
{
    public function sendOtp(Request $request)
    {
        //  Validate phone number input
        $otpValidation = Validator::make($request->all(), [
            'phone_number' => ['required'] // You can add regex if needed
        ]);

        if ($otpValidation->fails()) {
            return response()->json(['error' => $otpValidation->errors()], 422);
        }

        $phone = $request->phone_number;
        $otp = rand(1000, 9999);

        // Delete old OTPs for this number
        OtpRecordTable::where('phone_number', $phone)->delete();

        // Store OTP in database
        OtpRecordTable::create([
            'phone_number' => $phone,
            'otp' => $otp,
            'expires_at' => Carbon::now()->addMinutes(2),
        ]);

        // Send via Sparrow SMS API
        $response = Http::asForm()->post('https://api.sparrowsms.com/v2/sms/', [
            'token' => 'v2_HVZF3CO8Ositlly9QiU8HpRCyKg.B4Mw',
            'from'  => 'TheAlert',
            'to'    => $phone,
            'text'  => "Your OTP code is: $otp"
        ]);

        $responseData = $response->json();
        Log::info("Sparrow SMS Response: ", $responseData);

        if ($response->successful() && ($responseData['response_code'] ?? 0) == 200) {
            return response()->json(['message' => 'OTP sent successfully.']);
        }

        return response()->json([
            'error' => 'Failed to send OTP.',
            'response' => $responseData
        ], 500);
    }

    public function resendOtp(Request $request)
    {
        $otpValidation = Validator::make($request->all(), [
            'phone_number' => ['required']
        ]);

        if ($otpValidation->fails()) {
            return response()->json(['error' => $otpValidation->errors()], 422);
        }

        $phone = $request->phone_number;

        $otpRecord = OtpRecordTable::where('phone_number', $phone)->latest()->first();

        if ($otpRecord && Carbon::now()->lessThan($otpRecord->expires_at)) {
            // Reuse the existing OTP
            $otp = $otpRecord->otp;
        } else {
            // Old or no OTP — generate new one
            OtpRecordTable::where('phone_number', $phone)->delete(); // clear old
            $otp = rand(1000, 9999);
            OtpRecordTable::create([
                'phone_number' => $phone,
                'otp' => $otp,
                'expires_at' => Carbon::now()->addMinutes(5),
            ]);
        }

        // Send via Sparrow SMS API
        $response = Http::asForm()->post('https://api.sparrowsms.com/v2/sms/', [
            'token' => 'v2_HVZF3CO8Ositlly9QiU8HpRCyKg.B4Mw',
            'from'  => 'TheAlert',
            'to'    => $phone,
            'text'  => "Your OTP code is: $otp"
        ]);

        $responseData = $response->json();
        Log::info("Sparrow SMS Resend Response: ", $responseData);

        if ($response->successful() && strval($responseData['response_code'] ?? '') === '200') {
            return response()->json(['message' => 'OTP resent successfully.']);
        }

        return response()->json([
            'error' => 'Failed to resend OTP.',
            'response' => $responseData
        ], 500);
    }


    public function verifyOtp(Request $request)
    {
        $otpValidation = Validator::make($request->all(), [
            'phone_number' => 'required',
            'otp' => 'required|digits:4'
        ]);

        if ($otpValidation->fails()) {
            return response()->json(['error' => $otpValidation->errors()], 422);
        }

        $phone = $request->phone_number;
        $inputOtp = $request->otp;

        $otpRecord = OtpRecordTable::where('phone_number', $phone)->latest()->first();

        if (!$otpRecord) {
            return response()->json(['error' => 'No OTP found. Please request a new one.'], 400);
        }

        if (Carbon::now()->greaterThan($otpRecord->expires_at)) {
            $otpRecord->delete();
            return response()->json(['error' => 'OTP has expired. Please request a new one.'], 400);
        }

        if ($otpRecord->otp !== $inputOtp) {
            return response()->json(['error' => 'Invalid OTP.'], 400);
        }

        $otpRecord->delete(); // Remove OTP after successful use

        return response()->json(['message' => 'OTP verified successfully.']);
    }
}
