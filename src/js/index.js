
//Search Controller
import Search from './models/Search'
import {element,renderLoader,stopLoader} from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'

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
     state.search=new Search(query);

     await state.search.getResult();
        if(query){
    //2> new Search Object and add to state 
    //3>Prepare ui
        searchView.clearInput();
        searchView.clearOldResults();
        renderLoader(element.parentResult);
     //4>Search for recipes
    
     

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

const ctrlRecipe=async()=> {



//get the id of the recipe from the url
recipeView.clearRecipe();
    const recipeID = window.location.hash.replace('#','');

    if(recipeID){

        //get ui ready
        if(state.recipe)
        {
  
        //remove the hashtag in it
        searchView.highlightSelected(recipeID);}

        //create a new recipe witht the given id in constant recipe (swaited )
        state.recipe =  new Recipe(recipeID);
        renderLoader(element.recipeForm);

         try{
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
         console.log(state.recipe);
            } catch(error){console.log(error);}
        stopLoader();
        recipeView.renderRecipe(state.recipe);




        }
}
['hashchange','load'].forEach(cur => window.addEventListener(cur,ctrlRecipe));
