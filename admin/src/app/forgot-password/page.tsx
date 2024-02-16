"use client";

import { Error } from "@/components/Error";
import { InputGroup } from "@/components/InputGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";

import { z } from "zod";
import { auth } from "@/services/firebase";
import { useToast } from "@/components/ui/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is empty").email(),
});

type forgotPasswordSchemaProps = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordSchemaProps>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  function onSubmit(data: forgotPasswordSchemaProps) {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toast.toast({
          title: "Check your email",
        });
      })
      .catch((error) => {
        toast.toast({
          title: `${error}`,
        });
      });
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-softBlack to-hardBlack">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-[600px] max-w-[600px] flex-col gap-5 rounded-md bg-hardBlack p-8 shadow-sm shadow-white max-md:w-[400px] max-sm:w-[300px]"
      >
        <div>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email@email.com"
              className="rounded-md placeholder:text-grayText"
              {...register("email")}
            />
          </InputGroup>

          <Error error={errors.email?.message} />
        </div>

        <Button type="submit" className="flex gap-3">
          Send
        </Button>

        <Link href="/create-account">
          <p className="mt-5 text-xs text-sky-500 hover:underline">
            Create account
          </p>
        </Link>
      </form>
    </div>
  );
}
