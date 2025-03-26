class HtmlHelper {
    public static makeElement(tag: string, innerText: string = "", classList : Array<string> = []) : HTMLElement{
        const element = document.createElement(tag);
        element.innerText = innerText;
        for(let className of classList){
            element.classList.add(className);
        }
        return element;
    }

    public static loadJsonFile(callback: (json: any) => void){
        const fileInput : HTMLInputElement = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none";
        fileInput.accept = "application/json";

        fileInput.addEventListener("change", (event : Event) => {
            const file : File = ((<HTMLInputElement> event.target).files!)[0];

            if(file){
                const reader = new FileReader();

                reader.onload = (e : ProgressEvent<FileReader>) => {
                    const content : string = e.target?.result as string;
                    fileInput.remove();

                    callback(JSON.parse(content));
                };
    
                reader.readAsText(file);
            }
        });

        fileInput.click();
    }

    public static saveJsonFile(json: any, fileName: string){
        const jsonString : string = JSON.stringify(json, null, 4);
        
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url : string = window.URL.createObjectURL(blob);
        
        const a : HTMLAnchorElement = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        
        a.click();
        window.URL.revokeObjectURL(url);
    }
}