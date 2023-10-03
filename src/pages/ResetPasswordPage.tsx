import Logo from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useResetPasswordMutation } from "@/redux/api/authApiSlice";
import { Link, useParams } from "react-router-dom";
import L_Input from "@/components/Input";
import L_Label from "@/components/Label";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

function ResetPasswordPage() {
  const { resetToken = "" } = useParams<{ resetToken: string }>();
  const [resetPassword, { isLoading, isError, isSuccess, error, data }] =
    useResetPasswordMutation();

  const errorMessage = error ? error?.data.message : null;

  const passwordVerificationRegex =
    /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
  const resetPasswordSchema = object({
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .regex(
        passwordVerificationRegex,
        "Password must contain at least 3 lowercase, 2 uppercase, 2 numbers, and 1 special character"
      ),
    passwordConfirm: string().nonempty("Password is required"),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirmation"],
    message: "Passwords do not match",
  });

  const formField = [
    {
      id: "password",
      label: "Password",
      description: "Your password",
      autocomplete: "new-password",
      type: "password",
    },
    {
      id: "passwordConfirm",
      label: "Password Confirmation",
      description: "Your password confirmation",
      autocomplete: "new-password",
      type: "password",
    },
  ] as const;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  type TResetPassword = TypeOf<typeof resetPasswordSchema>;

  const onSubmitHandler: SubmitHandler<TResetPassword> = async (
    values: TResetPassword
  ) => {
    try {
      await resetPassword({ ...values, resetToken });
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
            Choose a new password for your account. A strong password should be
            at least 8 characters long and contain 2 uppercase characters, 3
            lowercase characters,2 numbers, and 1 special character.
          </p>
          <form>
            {formField.map((field) => {
              return (
                <div key={field.id}>
                  <L_Label
                    error={!!errors[field.id]}
                    htmlFor={field.id}
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    {field.label}
                  </L_Label>
                  <L_Input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    register={register}
                    aria-invalid={errors[field.id] ? "true" : "false"}
                    aria-describedby={
                      errors[field.id]
                        ? `${field.id} - ${errors[field.id]?.message}`
                        : field.description
                    }
                    required
                    autoComplete={field.autocomplete}
                    className="focus-visible:ring-indigo-600"
                  />
                  {errors[field.id] && (
                    <p
                      role="alert"
                      className="text-sm font-medium text-destructive"
                    >
                      {errors[field.id]?.message}
                    </p>
                  )}
                </div>
              );
            })}
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
          {isSuccess && (
            <p className="text-sm font-medium text-green-500">
              {data?.message}
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

export default ResetPasswordPage;
