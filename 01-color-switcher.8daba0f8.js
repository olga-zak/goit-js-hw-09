const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),r=document.querySelector("body");let o=null;e.setAttribute("style","border-radius:4px; border-color: green; background-color: green;"),t.setAttribute("style","border-radius:4px; border-color: red; background-color: red;"),e.addEventListener("click",(function(t){o=setInterval((()=>{r.setAttribute("style",`background-color: #${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`)}),1e3),e.setAttribute("disabled","true")})),t.addEventListener("click",(function(t){clearInterval(o),e.removeAttribute("disabled","true")}));
//# sourceMappingURL=01-color-switcher.8daba0f8.js.map