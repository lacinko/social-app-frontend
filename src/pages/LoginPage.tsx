import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, literal, object, string } from "zod";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/Button";
import L_Input from "@/components/Input";
import L_Label from "@/components/Label";
import { useLoginUserMutation } from "@/redux/api/authApiSlice";
import { useEffect } from "react";

function LoginPage(): JSX.Element {
  const [loginUser, { isLoading, isSuccess, error, isError, data }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  const loginSchema = object({
    email: string().min(1, "Email is required").email("Email is invalid"),
    password: string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    //persistUser: literal(true).optional(),
  });

  type TLogin = TypeOf<typeof loginSchema>;

  const defaultValues: TLogin = {
    email: "",
    password: "",
  };

  const formField = [
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
      autocomplete: "current-password",
      type: "password",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<TLogin> = async (values: TLogin) => {
    try {
      const response = await loginUser(values);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }
  }, [isSuccess]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo size="large" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
          {formField.map((field) => {
            const errorKey = field.id as keyof TLogin;
            return (
              <div key={field.id}>
                <div className="flex justify-between">
                  <L_Label
                    error={!!errors[errorKey]}
                    htmlFor={field.id}
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    {field.label}
                  </L_Label>
                  {field.id === "password" && (
                    <div className="text-sm">
                      <Link
                        to="/forgot-password"
                        className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  )}
                </div>
                <L_Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  register={register}
                  aria-invalid={errors[errorKey] ? "true" : "false"}
                  aria-describedby={
                    errors[errorKey]
                      ? `${field.id} - ${errors[errorKey]?.message}`
                      : field.description
                  }
                  required
                  autoComplete={field.autocomplete}
                  className="focus-visible:ring-indigo-600"
                />

                {errors[errorKey] && (
                  <p
                    role="alert"
                    className="text-sm font-medium text-destructive"
                  >
                    {errors[errorKey]?.message}
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
          <div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign in
            </Button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register for free.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
