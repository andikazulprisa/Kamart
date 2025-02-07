type Propstypes = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

const Input = (props: Propstypes) => {
  const { label, name, type, placeholder } = props;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-black">
        {label}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Input;
