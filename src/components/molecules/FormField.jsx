import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({
  label,
  error,
  children,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </Label>
      )}
      {children || <Input error={!!error} {...props} />}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default FormField;