"use strict";
class HtmlHelper {
    static makeElement(tag, innerText = "", classList = []) {
        const element = document.createElement(tag);
        element.innerText = innerText;
        for (let className of classList) {
            element.classList.add(className);
        }
        return element;
    }
    static loadJsonFile(callback) {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none";
        fileInput.accept = "application/json";
        fileInput.addEventListener("change", (event) => {
            const file = (event.target.files)[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    var _a;
                    const content = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                    fileInput.remove();
                    callback(JSON.parse(content));
                };
                reader.readAsText(file);
            }
        });
        fileInput.click();
    }
    static saveJsonFile(json, fileName) {
        const jsonString = JSON.stringify(json, null, 4);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
