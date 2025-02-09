import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, id }) => {
  return (
    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span
        onClick={() => onChange(!checked)}
        className={`w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded cursor-pointer ${checked ? 'bg-primary-500' : ''}`}
      >
        {checked && <span className="text-white">✔</span>}
      </span>
      {label && <label htmlFor={id} className="select-none text-gray-700 cursor-pointer">{label}</label>}
    </div>
  );
};

export default Checkbox;
