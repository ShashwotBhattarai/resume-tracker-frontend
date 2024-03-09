import PropTypes from "prop-types";

function InputField({
  id,
  name,
  type,
  value,
  onChange,
  pattern,
  title,
  required,
  minLength,
  maxLength,
}) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        pattern={pattern}
        title={title}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InputField;
