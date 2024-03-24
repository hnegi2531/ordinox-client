import Button from "@/components/Button";
import OTPInput from "@/components/OTPInput";
import { useReedemInvite } from "@/hooks/mutations/useAddAddress";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
const Discord = () => {
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const { mutate: reedemInviteMutation, isPending: reedemInviteMutationLoading } = useReedemInvite();

  const handleOTPChange = (otp: string) => {
    setOtp(otp);
  };

  const handleInvite = () => {
    if (otp.length < 6) {
      toast.error("Invalid invite code");
      return;
    }
    reedemInviteMutation(otp.toString(), {
      onSuccess: () => {
        router.push("/earn");
      },
      onError: () => {
        toast.error("Invalid invite code");
      },
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col max-w-lg gap-20">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl text-center text-brand-300">enter invite code</h1>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-center">
              in order to deposit funds into your ordinox trading wallet and start earning points enter your invite code{" "}
            </p>
          </div>
          <div className="flex items-center justify-center w-full gap-2">
            <OTPInput
              inputStyle="bg-transparent text-center border w-8 rounded-md px-2 py-2"
              numInputs={6}
              onChange={handleOTPChange}
              // renderSeparator={<span>{separator}</span>}
              value={otp}
              inputType={"text"}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
              skipDefaultStyles
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full px-10 text-center">
          <Button
            variant="primary"
            loading={reedemInviteMutationLoading}
            disabled={reedemInviteMutationLoading}
            className="w-full uppercase"
            onClick={handleInvite}
          >
            redeem invite code
            {/* <span><Image ></span> */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Discord;
