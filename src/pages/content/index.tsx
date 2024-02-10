import { createRoot } from "react-dom/client";
//@ts-ignore
import workerURL from "./worker?script&module";
import "./style.css";
const div = document.createElement("div");
div.id = "__root";
document.body.appendChild(div);

const rootContainer = document.querySelector("#__root");
if (!rootContainer) throw new Error("Can't find Options root element");
const root = createRoot(rootContainer);
root.render(
  <div className="absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50">
    content script loaded
  </div>
);

try {
  // https://dev.to/jacksteamdev/advanced-config-for-rpce-3966
  const file = chrome.runtime.getURL(workerURL);
  const script = document.createElement("script");
  script.src = file;
  console.log({ file, workerURL });
  (document.head || document.documentElement).prepend(script); // Note: Despite what the TS types say, `document.head` can be `null`.
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
