import LoginView from "@/components/views/auth/login";

const LoginPage = () => {
  return (
    <>
      <LoginView />
      <div className="block text-sm font-medium text-black">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
        />
      </div>
    </>
  );
};

export default LoginPage;
