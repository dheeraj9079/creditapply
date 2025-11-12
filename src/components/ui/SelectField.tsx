
import { RootState } from "@/store/store";
import { Input, Select } from "@/styles/StyledComponents";
import React from "react";
import { useSelector } from "react-redux";

interface SelectFieldProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  size?: number;
  children: React.ReactNode;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  value,
  onChange,
  required = false,
  size,
  children
}) => {
    const { fields } = useSelector((state: RootState) => state.field);
    if(!fields.find((field) => field.name === id)) {
      return null;
    }

  return (
      <Select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        size={size}
      >{children}</Select>
  );
};

export default SelectField;
