import React, { useState, useEffect, useRef } from 'react';
import './Cell.css';

interface CellProps {
  row: number;
  col: number;
  value: string;
  isSelected: boolean;
  isEditing: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onValueChange: (value: string) => void;
}

const Cell: React.FC<CellProps> = ({
  row,
  col,
  value,
  isSelected,
  isEditing,
  onClick,
  onDoubleClick,
  onValueChange
}) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onValueChange(editValue);
    } else if (e.key === 'Escape') {
      setEditValue(value);
      onClick(); // Exit editing mode
    }
  };

  const handleBlur = () => {
    onValueChange(editValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const displayValue = value.startsWith('=') ? value : value;

  return (
    <div
      className={`cell ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="cell-input"
        />
      ) : (
        <div className="cell-content">
          {displayValue}
        </div>
      )}
    </div>
  );
};

export default Cell;
