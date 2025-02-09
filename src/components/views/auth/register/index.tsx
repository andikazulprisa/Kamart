import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const RegisterView = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email') as string,
      fullname: formData.get('fullname') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
    };

    try {
      // API call here
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" name="email" type="email" />
          <Input label="Fullname" name="fullname" type="text" />
          <Input label="Phone" name="phone" type="number" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" onClick={() => {}}>
            {loading ? "Loading..." : "Register"}
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
