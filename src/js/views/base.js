export const element={
searchForm:document.querySelector('.search'),
searchInput:document.querySelector('.search__field'),
resultsList:document.querySelector('.results__list'),
parentResult:document.querySelector('.results')

};

export const renderLoader = parent => {
const loader =`<div class ="loader">
                    <svg>
                         <use href='img/icons.svg#icon-cw'></use> 
                    </svg>
              </div>`;
parent.insertAdjacentHTML('afterbegin',loader);

};