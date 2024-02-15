"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/services/firebase";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { FormAuth } from "@/components/FormAuth";
import { FormAuthTitle } from "@/components/FormAuthTitle";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/slices/userSlice";

export const userSchema = z.object({
  email: z.string().min(1, "Email is empty").email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type UserSchemaProps = z.infer<typeof userSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        router.push("/inventory");

        if (typeof window !== "undefined") {
          const googleUser = window.localStorage.setItem(
            "@market/storedUser",
            JSON.stringify(result.user),
          );
          dispatch(setUser(googleUser));
        }
      })
      .catch(() => {
        toast({
          title: "Error signing in with Google",
          description:
            "An error occurred while signing in with Google. Please try again later.",
        });
      })
      .finally(() => setIsLoading(false));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaProps>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserSchemaProps) => {
    setIsLoading(true);

    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "@market/storedUser",
            JSON.stringify(user),
          );
        }
        setTimeout(() => {
          router.push("/inventory");
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: `${error.code}`,
          description: `${error.message}`,
        });
      });
  };

  const images = [
    {
      src: "https://images.unsplash.com/photo-1547127796-06bb04e4b315?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "object-fit h-screen w-screen max-md:hidden",
    },
    {
      src: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "object-fit h-screen w-screen md:hidden",
    },
  ];

  return (
    <main className="relative flex min-h-screen w-screen flex-col items-center justify-center gap-10 bg-hardBlack">
      <div className="absolute inset-0 opacity-25">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            width={0}
            height={0}
            sizes="100%"
            alt="background"
            className={image.className}
          />
        ))}
      </div>

      <div className="relative w-[600px] max-w-[600px] rounded-md bg-hardBlack p-8 shadow-sm shadow-white max-md:w-[400px] max-sm:w-[300px]">
        <FormAuthTitle title="Login">
          <button onClick={handleGoogleSignIn} className="hover:scale-110">
            <Image
              src="/login/icon-google.png"
              alt="Google logo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-auto min-w-[20px]"
            />
          </button>
        </FormAuthTitle>

        <FormAuth
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isLoading={isLoading}
          buttonTitle="Login"
        />

        <Link href="/create-account">
          <p className="mt-5 text-xs text-sky-500 hover:underline">
            Create account
          </p>
        </Link>
      </div>
    </main>
  );
}
