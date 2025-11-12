
import { RootState } from "@/store/store";
import { Input } from "@/styles/StyledComponents";
import React from "react";
import { useSelector } from "react-redux";

interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  size?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  size
}) => {
    const { fields } = useSelector((state: RootState) => state.field);
    if(!fields.find((field) => field.name === id)) {
      return null;
    }

  return (
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        size={size}
      />
  );
};

export default InputField;
