"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputGroup } from "@/components/InputGroup";
import { useState } from "react";
import { EyeOffIcon, EyeIcon, Loader } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Error } from "@/components/Error";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setUser } from "@/app/redux/slices/userSlice";
import { toast } from "@/components/ui/use-toast";

const userSchema = z.object({
  email: z.string().min(1, "Email is empty").email(),
  password: z.string().min(1, "Password is empty"),
});

type UserSchemaProps = z.infer<typeof userSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [localUser, setLocalUser] = useState({});
  const router = useRouter();
  const dispatch = useAppDispatch();

  localStorage.setItem("@market/userClient", JSON.stringify(localUser));

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(setUser(result.user));
        router.push("/inventory");
        setLocalUser(result.user);
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

  const onSubmit = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/inventory");
    }, 2000);
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
    <main className="bg-hardBlack relative flex min-h-screen w-screen flex-col items-center justify-center gap-10">
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
      <div className="bg-hardBlack relative w-[600px] max-w-[600px] rounded-md p-8 shadow-sm shadow-white max-md:w-[400px] max-sm:w-[300px]">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-center text-3xl font-bold text-white">Login</h1>

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
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@email.com"
                className="rounded-md placeholder:text-grayText"
                autoFocus
                {...register("email")}
              />
            </InputGroup>

            <Error error={errors.email?.message} />
          </div>

          <div>
            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  className="placeholder:text-grayText"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute bottom-2 right-2 top-2 px-1 text-white"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </InputGroup>

            <Error error={errors.password?.message} />
          </div>

          <Button type="submit" className="flex gap-3">
            {isLoading && <Loader className="animate-spin" />}
            LogIn
          </Button>
        </form>
      </div>
    </main>
  );
}
