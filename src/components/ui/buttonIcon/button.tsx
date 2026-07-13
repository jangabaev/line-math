
import style from "./button.module.css"

interface ButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function ButtonIcon({
  children,
  active = false,
  onClick,
}: ButtonProps) {
  return (
    <button
       className={`${style.button} ${active ? style.active : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}