!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=null;function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.addEventListener("click",(function(t){e.removeAttribute("disabled"),t.currentTarget.disabled="true",r=setInterval(a,1e3)})),e.addEventListener("click",(function(e){t.removeAttribute("disabled"),e.currentTarget.disabled="true",clearInterval(r)})),e.disabled="true"}();
//# sourceMappingURL=01-color-switcher.80b59fcb.js.map