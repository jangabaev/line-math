import { useState, type ChangeEvent } from "react";
import styles from "./range.module.css";

interface RangeInputProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  label?: string;
  unit?: string;
  onChange?: (value: number) => void;
}

const RangeInput = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  label = "Qiymatni tanlang",
  unit = "",
  onChange,
}: RangeInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const progress = ((value - min) / (max - min)) * 100;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label htmlFor="custom-range" className={styles.label}>
          {label}
        </label>
      </div>

      <div className={styles.rangeWrapper}>
        <input
          id="custom-range"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={styles.range}
          style={{
            background: `linear-gradient(
              to right,
              #6c5ce7 0%,
              #8e7dff ${progress}%,
              #e6e7ef ${progress}%,
              #e6e7ef 100%
            )`,
          }}
        />

        <div className={styles.rangeInfo}>
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};

export default RangeInput;
