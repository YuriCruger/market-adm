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

const userSchema = z.object({
  email: z.string().min(1, "Email is empty").email(),
  password: z.string().min(1, "Password is empty"),
});

type UserSchemaProps = z.infer<typeof userSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

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
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <main className="min-h-screen w-screen flex flex-col gap-10 items-center justify-center bg-blackBGLoginPage relative">
      <div className="absolute inset-0 opacity-25">
        <Image
          src="https://images.unsplash.com/photo-1434719079929-f61498a4828e?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={0}
          height={0}
          sizes="100%"
          alt="background"
          className="w-screen h-screen object-fit"
        />
      </div>
      <div className="shadow-sm shadow-white w-5/12 p-8 rounded-md max-w-[600px] relative bg-blackBGLoginPage">
        <h1 className="font-bold text-3xl text-white mb-8 text-center">
          Login
        </h1>
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
                  className="absolute right-2 top-2 bottom-2 px-1 text-white"
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
