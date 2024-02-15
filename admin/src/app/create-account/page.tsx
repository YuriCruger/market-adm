"use client";

import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormAuth } from "@/components/FormAuth";
import { FormAuthTitle } from "@/components/FormAuthTitle";
import { UserSchemaProps } from "@/app/page";

const newUserSchema = z.object({
  email: z.string().min(1, "Email is empty").email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function CreateAccount() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserSchemaProps>({
    resolver: zodResolver(newUserSchema),
  });

  const onSubmit = async (data: UserSchemaProps) => {
    setIsLoading(true);

    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: `${error.code}`,
          description: `${error.message}`,
        });
        reset();
      });
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-softBlack to-hardBlack">
      <div className="relative w-[600px] max-w-[600px] rounded-md bg-hardBlack p-8 shadow-sm shadow-white max-md:w-[400px] max-sm:w-[300px]">
        <FormAuthTitle title="Create account" />
        <FormAuth
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isLoading={isLoading}
          buttonTitle="Create account"
        />
      </div>
    </div>
  );
}
