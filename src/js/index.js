
//Search Controller
import Search from './models/Search'
import {element,renderLoader,stopLoader} from './views/base'
import * as searchView from './views/searchView'
import Recipe from './models/Recipe'


/** Global state of ther app
 * -Search object
 * -current recipe object
 * -shopping list object
 * liked recipes
 */
const state ={};

const search = document.querySelector('.search');
const ctrlSearch = async() => {
    //1> get query from the view
     const query=searchView.getInput();
        if(query){
    //2> new Search Object and add to state 
         state.search=new Search(query);
    //3>Prepare ui
        searchView.clearInput();
        searchView.clearOldResults();
        renderLoader(element.parentResult);
     //4>Search for recipes
       await state.search.getResult();
    //4>render results on ui 
        stopLoader();
        searchView.renderInput(state.search.result);
        }
 

}
element.searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    ctrlSearch();
    console.log('hello');


});

element.resultPages.addEventListener('click',e=>{
    const targetPage=e.target.closest('.btn-inline');  
    if(targetPage){
    searchView.clearOldResults();
    const goTopage=parseInt(targetPage.dataset.goto);
    searchView.renderInput(state.search.result,goTopage);
                }
})

//Recipe Controller

const data =new Recipe(46956);
data.getRecipe();
console.log(data);