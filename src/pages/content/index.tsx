// import workerURL from "./worker?url";
import { createRoot } from "react-dom/client";
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
  // How to prepend scripts https://crxjs.dev/vite-plugin/concepts/content-scripts
  const workerURL = chrome.runtime.getURL("src/pages/content/worker.ts");
  const script = document.createElement("script");
  script.src = workerURL;
  console.log({ workerURL });
  (document.head || document.documentElement).prepend(script); // Note: Despite what the TS types say, `document.head` can be `null`.
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
