import Logo from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useForgotPasswordMutation } from "@/redux/api/authApiSlice";
import { Link } from "react-router-dom";
import L_Input from "@/components/Input";
import L_Label from "@/components/Label";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

function ForgotPasswordPage() {
  const [forgotPassword, { isLoading, isError, isSuccess, error }] =
    useForgotPasswordMutation();
  const errorMessage = error ? error?.data.message : null;

  const forgotPasswordSchema = object({
    email: string().min(1, "Email is required").email("Email is invalid"),
  });
  const errorKey = "email" as keyof TForgotPassword;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  type TForgotPassword = TypeOf<typeof forgotPasswordSchema>;

  const onSubmitHandler: SubmitHandler<TForgotPassword> = async (
    values: TForgotPassword
  ) => {
    try {
      await forgotPassword(values);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(
      "isSuccess",
      isSuccess,
      "isError",
      isError,
      "isLoading",
      isLoading
    );
  }, [isSuccess, isError, isLoading]);

  return (
    <div className="flex min-h-full container flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <Logo size="large" />
        <div className="pt-12"></div>
        <div className="flex flex-col gap-5">
          <p className="font-bold text-xl lg:text-5xl">Reset your password</p>

          <p>
            Tell us the email address associated with your account, and we’ll
            send you an email with a link to reset your password.
          </p>
          <form>
            <div>
              <L_Label htmlFor="email">Email</L_Label>
              <L_Input
                id="email"
                name="email"
                type="email"
                register={register}
                aria-invalid={errors[errorKey] ? "true" : "false"}
                aria-describedby={
                  errors[errorKey]
                    ? `email - ${errors[errorKey]?.message}`
                    : "This is a input for email"
                }
                required
                autoComplete="email"
                className="focus-visible:ring-indigo-600"
              />
            </div>
            <div className="pt-6"></div>
            <Button
              onClick={handleSubmit(onSubmitHandler)}
              isLoading={isLoading}
              className="w-full"
            >
              Confirm
            </Button>
          </form>

          {isError && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="pt-12"></div>
        <div className="flex gap-4 text-sm">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
