import Logo from "@/components/Logo";
import L_Input from "@/components/Input";
import L_Label from "@/components/Label";
import { Button, buttonVariants } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";
import { useRegisterUserMutation } from "@/redux/api/authApiSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const passwordVerificationRegex =
  /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
const registerSchema = object({
  name: string()
    .nonempty("Name is required")
    .min(3, "Name must be more than 3 characters")
    .max(32, "Name must be less than 32 characters"),
  email: string().nonempty("Email is required").email("Email is invalid"),
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

export type TRegister = TypeOf<typeof registerSchema>;

function RegisterPage() {
  const user = useAuth();
  const [registerUser, { isLoading, isSuccess, error, isError, data }] =
    useRegisterUserMutation();

  const defaultValues: TRegister = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<TRegister> = async (
    values: TRegister
  ) => {
    try {
      await registerUser(values);
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  useEffect(() => {
    console.log(
      "IS ERROR",
      isError,
      "IS SUCCESS",
      isSuccess,
      "IS LOADING",
      isLoading,
      "ERROR",
      error,
      "DATA",
      data?.message
    );
  }, [isSuccess, isError, isLoading]);

  const formField = [
    {
      id: "name",
      label: "Name",
      description: "Your full name",
      autocomplete: "name",
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      description: "Your email address",
      autocomplete: "email",
      type: "email",
    },
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

  if (isSuccess) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo size="large" />
          <div className="pt-12"></div>
          <div className="flex flex-col gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-green-600 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1>{data?.message}</h1>
            <Link
              to="/login"
              className={buttonVariants({ className: "w-full" })}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo size="large" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account for free
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
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
          {isError && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error?.data?.message}
            </p>
          )}
          {isSuccess && (
            <p className="text-sm font-medium text-green-500">
              {data?.message}
            </p>
          )}
          <div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
