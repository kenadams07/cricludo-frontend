"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useResendVerification, useVerifyEmail } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalize } from "@/lib/utils";
import { useUsersAnalysisData } from "@/hooks/useAnalysisData";

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(300);
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { trigger: triggerVerifyEmail, isMutating: emailMutating } =
    useVerifyEmail();
  const { trigger: triggerResendVerfication } = useResendVerification();
  const verifyEmail = useAuthStore((s) => s.verifyEmail);
  const setUser = useAuthStore((s) => s.setUser);
  const isLogin = useAuthStore((l) => l.isLogin);

  const handleGoBack = () => {
    router.back();
  };

  const handleResend = async () => {
    setResendTimer(300);
    toast.message("Sending new OTP...");

    try {
      const res = await triggerResendVerfication({ email: verifyEmail });
      if (res.code) {
        toast.error(res.message || "Failed to resend OTP.");
      } else {
        toast.success(res.message || "OTP resent to your email.");
      }
    } catch (err: any) {
      toast.error(err.message || "Network error, please try again.");
    }
  };

  useEffect(() => {
    if (searchParams.get("reverify") === "true" || isLogin) {
      handleResend();
    }
  }, [searchParams]);

  useEffect(() => {
    if (!verifyEmail) {
      handleGoBack();
    }
  }, [verifyEmail, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const code = otp.join("");
    try {
      const res = await triggerVerifyEmail({
        email: verifyEmail,
        code,
        isLogin: isLogin,
        skip: true,
      });

      if (res.code) {
        toast.error(res.message || "❌ Invalid OTP, please try again.");
        if (res.code === 10015) {
          handleResend();
        }
      } else {
        if (res.user && res.isLogin) {
          setUser({
            ...res.user,
            firstName: capitalize(res.user.firstName),
            lastName: capitalize(res.user.lastName),
            name: `${capitalize(res.user.firstName)} ${capitalize(
              res.user.lastName,
            )}`,
            avatar: `${capitalize(
              res.user.firstName?.charAt(0) || "?",
            )}${capitalize(res.user.lastName?.charAt(0) || "?")}`,
            userType: res?.user?.userType || "unknown",
          });
          useUsersAnalysisData();
          if (res.user.userType === "agent") {
            router.push(`/user/${res.user?.user?.id || ""}`);
          } else {
            router.push("/");
          }
        } else {
          router.back();
        }
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "❌ Invalid OTP, please try again.");
    }

    setLoading(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto mt-10"
    >
      <h1 className="text-2xl font-semibold text-center mb-6">
        Enter Verification Code
      </h1>

      <div className="flex justify-center gap-3 mb-6">
        {otp.map((value, index) => (
          <Input
            key={index}
            ref={(el) => {
              (inputsRef.current[index] as HTMLInputElement | null) = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-lg font-medium border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0"
          />
        ))}
      </div>

      <Button className="w-full mb-3" onClick={handleVerify} disabled={loading}>
        {loading || emailMutating ? "Verifying..." : "Verify OTP"}
      </Button>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={handleResend}
          disabled={resendTimer > 0}
          className="text-blue-600 hover:text-blue-800"
        >
          {resendTimer > 0
            ? `Resend in ${formatTime(resendTimer)}`
            : "Resend Code"}
        </Button>
      </div>
      <div className="text-center mt-4">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          ← Go Back
        </Button>
      </div>
    </motion.div>
  );
}
