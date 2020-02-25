export const element={
searchForm:document.querySelector('.search'),
searchInput:document.querySelector('.search__field'),
resultsList:document.querySelector('.results__list'),
parentResult:document.querySelector('.results'),
resultPages:document.querySelector('.results__pages'),
recipeForm:document.querySelector('.recipe'),
recipeFormList:document.querySelector('.recipe__ingredients')





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



export const  convertFraction = function (_decimal) {

    function gcd(a, b) {
        return (b) ? gcd(b, a % b) : a;
    }

	var top		= _decimal.toString().replace(/\d+[.]/, '');
	var bottom	= Math.pow(10, top.length);
	if (_decimal > 1) {
		top	= +top + Math.floor(_decimal) * bottom;
	}
	var x = gcd(top, bottom);
	var obj={
		top		: (top / x),
		bottom	: (bottom / x),
    };
  if(parseInt(obj.top)>parseInt(obj.bottom)){
        //here we have a number like 25/6 and want to convert it to 24/6 +1/6 5/4
        //convert first to integer (25)
        obj.top=parseInt(obj.top);
        //convert second to integer (6)
        obj.bottom=parseInt(obj.bottom);
        //get  the natural number 25/6 = 4
        const intRem=parseInt(obj.top/obj.bottom);
        console.log('intrem'+intRem);
        //calculate (fraction is 25-6*4 /6 ) 
        const  firstFrac = obj.top-obj.bottom*intRem+''
        return intRem+' '  +firstFrac +'/' + obj.bottom;
    }
    return obj.top+'/'+obj.bottom;
};