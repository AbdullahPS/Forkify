export const element={
searchForm:document.querySelector('.search'),
searchInput:document.querySelector('.search__field'),
resultsList:document.querySelector('.results__list'),
parentResult:document.querySelector('.results'),
resultPages:document.querySelector('.results__pages'),
recipeForm:document.querySelector('.recipe')

};
const stringElements ={
    loader:'loader'

};
export const renderLoader = parent => {
const loader =`<div class ="${stringElements.loader}">
                    <svg>
                         <use href='img/icons.svg#icon-cw'></use> 
                    </svg>
              </div>`;
parent.insertAdjacentHTML('afterbegin',loader);

};

export const stopLoader = ()=> {      //to stop the loading when search is complete 
    const target = document.querySelector(`.${stringElements.loader}`);
    if(target){
        target.parentElement.removeChild(target);

    }
};