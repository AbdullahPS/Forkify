
import {element} from './base';
export const getInput=() => element.searchInput.value;//this gets the input from the searchView
export const clearInput=()=> element.searchInput.value='';//clearing input search  field (called in controller)
export const clearOldResults=() => element.resultsList.innerHTML=element.resultPages.innerHTML='';
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

/**we have either 1 or 2 or 3 or 4 or 5  (arrayszise =30) (elementsperPAge =10 )
 * if page 1  i=1
 *  if page 2 i>i i>last
 * if page 3 arraysize/elementsize 
 */

 const addbtnPAge = (currentPage,type) => {

const btString= `<button class="btn-inline results__btn--${type=='prev'? 'prev' : 'next' }" data-goto ="${type=='prev'? currentPage-1 : currentPage+1 }">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type=='prev'? 'left' : 'right' }"></use>
                    </svg>
                    <span>Page ${type=='prev'? currentPage-1 : currentPage+1 }</span>
                </button>`;
element.resultPages.insertAdjacentHTML("beforeend",btString);


 }
const showPages=(currentPage,lastpage) => {
    const firstPage=1;
    if(currentPage== firstPage) { //if i am on the first page (just next)
        addbtnPAge(currentPage,'next');
    } 
    else if (currentPage==lastpage ) {//else if i am on the last  (just previos)
        addbtnPAge(currentPage,'prev');


    }      
    else if (currentPage>firstPage && currentPage <lastpage)  { //else if i am between (prev and next)
        addbtnPAge(currentPage,'prev');
        addbtnPAge(currentPage,'next');
        


    }              
     



}
export const renderInput=(dataArray,page=1,elToshow=10) =>{
    const start=(page-1)*elToshow;
    const end=Math.ceil(elToshow*page);
    dataArray.slice(start,end).forEach(renderElement);
    const lastpage=Math.ceil(dataArray.length/elToshow);
    showPages(page,lastpage);


};