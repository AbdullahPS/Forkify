export const element={
searchForm:document.querySelector('.search'),
searchInput:document.querySelector('.search__field'),
resultsList:document.querySelector('.results__list'),
parentResult:document.querySelector('.results'),
resultPages:document.querySelector('.results__pages'),
recipeForm:document.querySelector('.recipe'),
recipeFormList:document.querySelector('.recipe__ingredients'),
shopping:document.querySelector('.shopping__list'),
likeList:document.querySelector('.likes__list'),
like:document.querySelector('.likes__field')




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
    let newFrac='';


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
        let intRem=parseInt(obj.top/obj.bottom);
        // console.log('intrem'+intRem);
        //calculate (fraction is 25-6*4 /6 ) 
        let  firstFrac = obj.top-obj.bottom*intRem+'';//1
       
        //we want just 0  1/4  1/3 1/2 2/3  3/4  1 

        // //first calculate the long fraction
            const FracValue= parseFloat(firstFrac)/parseFloat(obj.bottom);
        //swittch the value 
            switch(true){
        //if its less than 0.175 =>  
        case FracValue<0.1:
            //make it zero
            newFrac='';
            break;
        //if its between 0.175 amd 0.27 => make it 0.25 
        case FracValue>=0.11 && FracValue<0.21:
            newFrac=' 1/5';
            break;
        case FracValue>=0.21 && FracValue<0.27:
            newFrac=' 1/4';
            break;
            
        //if its between 0.28 amd 0.4 => make it 0.33
        case FracValue>=0.27 && FracValue<0.4:
            newFrac=' 1/3';
            break;
        //if its between 0.41 amd 0.57 => make it 0.5 
        case FracValue>=0.4 && FracValue<0.5:
            newFrac=' 1/2';
            break;
        //if its between 0.58 amd 0.69 => make it 0.66
        case FracValue>=0.57 && FracValue<0.69:
            newFrac=' 2/3';
            break;

        //if its between 0.7 amd 0.85 => make it 0.75
        case FracValue>=0.69 && FracValue<0.86:
            newFrac=' 3/4';
            break;

        //if its between 0.86 amd 1 => make it 1 
        case FracValue>=0.86 && FracValue<1:
            intRem+=1;
            newFrac='';
            break;


            }
            console.log(intRem+' '+newFrac);

        return intRem+''+newFrac;

    }
    if(obj.top+''.length+ obj.bottom+''>10)
    return roundToFract(obj.top,obj.bottom);
    else
    return obj.top+'/'+obj.bottom;

};

const roundToFract=(firstFrac,secondFrac)=>{



        //first calculate the long fraction
        const FracValue= parseFloat(firstFrac)/parseFloat(secondFrac);
        let newFrac='';
            //swittch the value 
            switch(true){
        //if its less than 0.175 =>  
        case FracValue<0.1:
            //make it zero
            newFrac='1/10';
            break;
        //if its between 0.175 amd 0.27 => make it 0.25 
        case FracValue>=0.1 && FracValue<0.21:
            newFrac='1/5';
            break;
        case FracValue>=0.21 && FracValue<0.27:
            newFrac='1/4';
            break;
            
        //if its between 0.28 amd 0.4 => make it 0.33
        case FracValue>=0.27 && FracValue<0.4:
            newFrac='1/3';
            break;
        //if its between 0.41 amd 0.57 => make it 0.5 
        case FracValue>=0.4 && FracValue<0.57:
            newFrac='1/2';
            break;
        //if its between 0.58 amd 0.69 => make it 0.66
        case FracValue>=0.57 && FracValue<0.69:
            newFrac='2/3';
            break;

        //if its between 0.7 amd 0.85 => make it 0.75
        case FracValue>=0.69 && FracValue<0.86:
            newFrac='3/4';
            break;

        //if its between 0.86 amd 1 => make it 1 
        case FracValue>=0.86 && FracValue<1:
            newFrac='1';
            break;


            }

        return newFrac;

    
}