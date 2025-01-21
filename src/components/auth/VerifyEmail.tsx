
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Axios } from "@/lib/axios";

const Verificationpage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }
    Axios.get(`/users/new-verification?token=${token}`)
      .then((res) => {
        setError(res.data?.error);
        setSuccess(res.data?.success);
      })
      .catch(() => {
        setError("something went wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
    headerLabel="Email Verification"
    backButtonLink="Back to login"
    backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <div className="w-58">
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
      </div>
    </CardWrapper>
  );
};

export default Verificationpage;
