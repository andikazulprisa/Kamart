import Link from "next/link";

type Proptypes = {
  error?: string;
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
};

const AuthLayout = (props: Proptypes) => {
  const { error, title, children, link, linkText } = props;
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">
          {title}
        </h1>
        {error && <p className="text-red-600 px-10 text-center">{error}</p>}
        <div>{children}</div>

        <p className="mt-4 text-sm text-black text-center">
            {linkText}
          <Link href={link} className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
