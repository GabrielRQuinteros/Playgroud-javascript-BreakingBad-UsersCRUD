import { Quote } from "../interfaces/quote-interfaces";

const loadingComponent = `
    <div class="loading">Loading
    <span class="dot">.</span>
    <span class="dot">.</span>
    <span class="dot">.</span>
    </div>`

export const renderQuote = async ( element: HTMLDivElement ) => {
    element.innerHTML = loadingComponent;
    const quoteFetched: Quote|undefined = await fetchQuote(); 
    if( quoteFetched ) {
        const { author, quote } = quoteFetched;
        element.innerHTML = `"${quote}" - ${author}`;
    } else {
        element.innerHTML = `The server is not aviable. Could not find a quote.`
    }
}

const fetchQuote = async (): Promise< Quote | undefined> => {
    const url = " https://api.breakingbadquotes.xyz/v1/quotes";
    const response: Response = await fetch( url );
    
    if( response.status === 200 ) {
        const data: Quote[] = await response.json();
        return data[0];
    } else {
        return undefined;
    }
}

/** Esta constante es mi aplicacion en si.
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingBadApp = async (element: HTMLDivElement) => {
    renderQuote(element);
    renderButton(element);
}


const renderButton = (elementQuote: HTMLDivElement):void => {
    const element: HTMLDivElement = document.querySelector("#nextButtonDiv")!;
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Next Quote!";
    button.onclick = () => renderQuote(elementQuote);
    element.appendChild(button);
}

