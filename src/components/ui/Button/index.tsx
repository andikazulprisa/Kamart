type Propstypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  children: React.ReactNode;
};

const Button = (props: Propstypes) => {
  const { type, onClick, children } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400"
    >
      {children}
    </button>
  );
};

export default Button;
