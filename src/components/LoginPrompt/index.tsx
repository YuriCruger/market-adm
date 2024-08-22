import Link from "next/link";

export function LoginPrompt() {
  return (
    <div className="container flex items-center justify-center">
      <p className="font-bold text-white">
        Oops! It looks like you&apos;re not logged in. Please{" "}
        <Link href="/">
          <span className="font-extrabold text-violet-400 hover:underline">
            log in
          </span>
        </Link>
      </p>
    </div>
  );
}
