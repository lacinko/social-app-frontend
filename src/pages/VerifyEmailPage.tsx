import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useVerifyEmailMutation } from "@/redux/api/authApiSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VerifyEmailPage() {
  const { verificationCode } = useParams() as { verificationCode: string };
  const [verifyEmail, { isLoading, isError, isSuccess, error }] =
    useVerifyEmailMutation();
  const navigate = useNavigate();

  const errorMessage = error ? error?.data.message : null;

  async function handleClickVerifyUser() {
    try {
      await verifyEmail({ verificationCode });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Email verified!",
        description: "You can now login to your account",
      });
      navigate("/login");
    }
  }, [isError, isSuccess, isLoading, navigate]);

  return (
    <div className="flex min-h-full container flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <Logo size="large" />
        <div className="pt-12"></div>
        <div className="flex flex-col gap-5">
          <p className="font-bold text-xl lg:text-5xl">
            Verify your email to finish signing up for Meditations
          </p>
          <p className="text-gray-500">
            Thank you so much for choosing Meditations
          </p>
          <p>
            Please the button below to verify your email address and activate
            your account
          </p>
          <Button onClick={handleClickVerifyUser} isLoading={isLoading}>
            Confirm
          </Button>
          {isError && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
