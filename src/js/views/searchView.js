
import {element} from './base';
export const getInput=() => element.searchInput.value;//this gets the input from the searchView
export const clearInput=()=> element.searchInput.value='';//clearing input search  field (called in controller)
export const clearOldResults=() => element.resultsList.innerHTML='';
const limitRecipeTitle=(title,limit=17)=>{
    return title.length>limit ? title.slice(1,limit) +'...' :  title  ;

   
}
const renderElement =el => {
    const markUp = `
            <li>
                            <a class="results__link results__link--active" href="#23456">
                                <figure class="results__fig">
                                    <img src="${el.image_url}" alt="${el.title}">
                                </figure>
                                <div class="results__data">
                                    <h4 class="results__name">${limitRecipeTitle(el.title)}</h4>
                                    <p class="results__author">${el.publisher}</p>
                                </div>
                            </a>
                        </li>`;

    element.resultsList.insertAdjacentHTML("beforeend",markUp);

}
export const renderInput=dataArray =>{
    console.log(dataArray);

    dataArray.forEach(renderElement);

};