import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl = query.callbackUrl
    ? Array.isArray(query.callbackUrl)
      ? query.callbackUrl[0]
      : query.callbackUrl
    : "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        formData.forEach((_, key) => formData.delete(key));
        push(callbackUrl);
      } else {
        setError("Email atau password salah");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">
          Login
        </h1>
        {error && <p className="text-red-600 px-10 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" onClick={() => {}}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-black text-center">
          Dont have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
