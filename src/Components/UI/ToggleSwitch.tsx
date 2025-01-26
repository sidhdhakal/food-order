import React, { useState } from 'react';

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  checked: controlledChecked, 
  onChange, 
  disabled = false,
  label 
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  
  const isChecked = controlledChecked !== undefined 
    ? controlledChecked 
    : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    
    const newCheckedState = !isChecked;
    
    if (onChange) {
      onChange(newCheckedState);
    }
    
    if (controlledChecked === undefined) {
      setInternalChecked(newCheckedState);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {label && (
        <span className="text-sm text-gray-700">
          {label}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
          rounded-full border-2 border-transparent transition-colors 
          duration-200 ease-in-out focus:outline-none 
          ${isChecked 
            ? 'bg-primary-400' 
            : 'bg-gray-200'
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : ''
          }
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 
            transform rounded-full bg-white shadow-lg 
            transition duration-200 ease-in-out 
            ${isChecked 
              ? 'translate-x-5' 
              : 'translate-x-0'
            }
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;