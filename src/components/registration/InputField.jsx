export default function InputField({ label, name, type = "text", placeholder, onChange }) {
  return (
    <div>
      <fieldset>
        <legend className="text-sm font-light">{label}</legend>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md"
          onChange={onChange}
        />
      </fieldset>
    </div>
  );
}
