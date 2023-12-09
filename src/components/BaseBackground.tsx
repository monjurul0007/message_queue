import type { FC, PropsWithChildren } from "react";

const BaseBackground: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {children}
      </div>
    </div>
  );
};

export default BaseBackground;
