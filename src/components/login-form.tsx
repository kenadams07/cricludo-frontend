"use client";
import { capitalize, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { mutate } from "swr";
import { API_URL } from "@/lib/config";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(30, { message: "Password must not exceed 30 characters" }),
});
type LoginData = z.infer<typeof LoginSchema>;


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const setVerifyEmail = useAuthStore((s) => s.setVerifyEmail);
  const setIsLogin = useAuthStore((l)=> l.setIsLogin)
  const setUser = useAuthStore((s) => s.setUser);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const { trigger, isMutating } = useLogin();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const responseData = await trigger(data);
      if (responseData?.code) {
        toast.info(responseData.message || "Login failed");
        return;
      }
      
      toast.success(responseData.message || "Login successful");
      if(!responseData.userVerified){
          setVerifyEmail(responseData?.user?.email || '')
          setIsLogin(true);
          router.push('/verify-otp')
          return;
        }
      if (responseData.user) {
        setUser({
          ...responseData.user,
          firstName: capitalize(responseData.user.firstName),
          lastName: capitalize(responseData.user.lastName),
          name: `${capitalize(responseData.user.firstName)} ${capitalize(
            responseData.user.lastName
          )}`,
          avatar: `${capitalize(responseData.user.firstName?.charAt(0) || "?")}${capitalize(
            responseData.user.lastName?.charAt(0) || "?"
          )}`,
          userType: responseData?.user?.userType || "unknown"
        });
         mutate(`${API_URL}/analysis/data`);
         if(responseData.user.userType === 'agent'){
          router.push(`/user/${responseData.user?.user?.id || ''}`)
         }else{
           router.push("/");
         }
      } else {
        setError("email", { message: "Invalid email" });
        setError("password", { message: "Invalid password" });
      }
    } catch (error) {
      toast.error("Login failed", { description: (error as Error).message });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                 
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading || isMutating
                    ? "Logging in..."
                    : "Log In"}
                </Button>
              </div>
              {/* <div className="text-center text-sm">
                Don&apos;t have an admin account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
              */}
              </div> 
          </form>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
