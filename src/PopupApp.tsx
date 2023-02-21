import React from "react";
import Navigation from "./components/Navigation";

export default function PopupApp() {
  const [isSelected, setIsSelected] = React.useState(false);

  const onClickTest = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="h-96 w-80">
      <Navigation isSelected={isSelected} />
      <div className="h-3/4 w-full">
        <button className="h-8 w-12 bg-slate-400" onClick={onClickTest}>
          테스트
        </button>
      </div>
    </div>
  );
}
