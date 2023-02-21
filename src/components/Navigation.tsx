import React from "react";
import clsx from "clsx";

interface Props {
  isSelected: boolean;
}

function NavBtn({ isSelected, text }: { isSelected: boolean; text: string }) {
  return (
    <div
      className={clsx(
        isSelected ? "w-1/2 border-r-2 border-gray-300" : "w-full",
        "py-2.5 text-center hover:bg-slate-100"
      )}
    >
      {text}
    </div>
  );
}

export default function Navigation({ isSelected }: Props) {
  return (
    <div className="flex w-full cursor-pointer flex-row border-b-2 border-gray-300 text-base ">
      <NavBtn isSelected={isSelected} text="플레이리스트" />
      {isSelected && <NavBtn isSelected={isSelected} text="현재 리스트" />}
    </div>
  );
}
