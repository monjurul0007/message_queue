import type { FC, MouseEventHandler, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      className={`rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
