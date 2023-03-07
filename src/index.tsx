import React from "react";
import ReactDOM from "react-dom/client";
import PopupApp from "./components/PopupApp";
import {RecoilRoot} from "recoil";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <PopupApp/>
        </RecoilRoot>
    </React.StrictMode>
);
