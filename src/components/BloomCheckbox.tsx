import React from 'react';
import styles from './BloomCheckbox.module.css';

interface BloomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
}

export const BloomCheckbox: React.FC<BloomCheckboxProps> = ({
  checked,
  onChange,
  id,
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={styles.checkbox} htmlFor={checkboxId}>
      <input
        type="checkbox"
        id={checkboxId}
        className={styles.checkboxInput}
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
      />
      <span className={styles.checkboxVisual}>
        <span className={styles.bloom} aria-hidden="true" />
        <svg
          className={styles.checkmark}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    </label>
  );
};
