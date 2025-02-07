import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">
          Register
        </h1>
        {error && <p className="text-red-600 px-10 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" name="email" type="email" />
          <Input label="Fullname" name="fullname" type="text" />
          <Input label="Phone" name="phone" type="number" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" onClick={() => {}}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-black text-center">
          Have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
