import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { Error } from "../Error";
import { InputGroup } from "../InputGroup";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FormEventHandler, useState } from "react";
import { UserSchemaProps } from "@/app/page";

interface FormAuthProps {
  handleSubmit: (
    onSubmit: (data: UserSchemaProps) => void,
  ) => FormEventHandler<HTMLFormElement>;
  onSubmit: (data: UserSchemaProps) => void;
  register: any;
  errors: Record<string, any>;
  isLoading: boolean;
  buttonTitle: string;
}

export function FormAuth({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isLoading,
  buttonTitle,
}: FormAuthProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </InputGroup>

        <Error error={errors.password?.message} />
      </div>

      <Button type="submit" className="flex gap-3">
        {isLoading && <Loader className="animate-spin" />}
        {buttonTitle}
      </Button>
    </form>
  );
}
