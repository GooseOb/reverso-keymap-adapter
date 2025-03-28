// ==UserScript==
// @name         Reverso Context Ctrl+C+C Adapter
// @namespace    https://greasyfork.org/en/users/901750-gooseob
// @version      1.0
// @description  Convert Ctrl+C+C to Ctrl+Alt+R, YouTube Captions integration
// @author       GooseOb
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  let ytCallback = null;

  if (window.location.hostname === "www.youtube.com") {
    const phantomElement = document.createElement("div");
    phantomElement.style.position = "absolute";
    phantomElement.style.fontSize = "0";
    document.body.appendChild(phantomElement);

    ytCallback = () => {
      const captionsText = Array.from(
        document.querySelectorAll(".html5-video-player .captions-text > span"),
        (el) => el.textContent,
      )
        .join(" ")
        .trim();

      if (captionsText) {
        phantomElement.textContent = captionsText;

        const range = document.createRange();
        range.selectNodeContents(phantomElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };
  }

  let ctrlPressed = false;
  let cCount = 0;
  let lastCPressTime = 0;
  const TIME_THRESHOLD = 300;

  document.addEventListener("keydown", (e) => {
    ctrlPressed = e.ctrlKey;

    if (ctrlPressed && e.key === "c") {
      const currentTime = Date.now();

      cCount = currentTime - lastCPressTime > TIME_THRESHOLD ? 1 : cCount + 1;

      lastCPressTime = currentTime;

      if (cCount === 2) {
        ytCallback?.();

        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "r",
            keyCode: 82,
            ctrlKey: true,
            altKey: true,
            bubbles: true,
            cancelable: true,
          }),
        );

        cCount = 0;
        lastCPressTime = 0;
      }
    }
  });

  document.addEventListener("keyup", (e) => {
    if (!e.ctrlKey) {
      ctrlPressed = false;
      cCount = 0;
      lastCPressTime = 0;
    }
  });
})();
