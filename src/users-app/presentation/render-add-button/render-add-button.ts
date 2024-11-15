import "./render-add-button.css"


export const renderAddButton = ( element : HTMLDivElement, callback?: Function| undefined ) => {

    const fabButton = document.createElement("button");

    fabButton.innerText = "+";
    fabButton.className = "fab-button";
    element.append( fabButton );

    

    fabButton.addEventListener( "click", () => {
        if( !callback )return;
        callback();
    } );

}