
//Search Controller
import Search from './models/Search'
import {element,renderLoader,stopLoader,convertFraction} from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import Recipe from './models/Recipe'
import List from './models/shoppingList'
import * as listView from './views/listView'
import expectedRound from 'expected-round'
import Like from './models/Likes'
import * as likeView from './views/likesView'


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
        recipeView.renderRecipe(
            state.recipe,
            state.like.isLiked(recipeID));

            // state.like.isLiked(id));




        }
}


//Search controller 
const addtoShoppinglist=(ingredient)=>{
   state.list = new List();
   ingredient.forEach(e=>{
       if(typeof(e.number)==="number") e.number;
       //eITHER 1
       //split n check 

       else if  (typeof(e.number)==="string"){
        let splitted = e.number.split(/[ /]/);
        console.log(splitted);

        if(e.number.length==1){
            e.number=parseInt(e.number);
        }
       //or 5/6
        else if (splitted.length==2){
            e.number=expectedRound.round10(parseFloat(splitted[0]/splitted[1]),-2);
        }
        else if(splitted.length==3){
         e.number=expectedRound.round10(parseFloat(splitted[0])+(parseFloat(splitted[1]/splitted[2])),-2);

        }
    }
       //OR 1 5/6
       
    state.list.addItem(e.unit,e.number,e.rest);


   })
   state.list.items.forEach(cur=>{

    listView.addItem(cur);


   })

    console.log(state.list.items);

}


//Like controller
const ctrlLike =()=>{

    //create a new liki if there is nooone
    if(!state.like) state.like=new Like();

    //check if its not liked
    if(!state.like.isLiked(state.recipe.id)){
        //add a like to model
        const arraey= state.like.addLike(state.recipe.id,state.recipe.author,state.recipe.title,state.recipe.image);
        //update in ui    
        console.log(arraey[0]);
        likeView.addLiker(arraey[0]);
        likeView.toggleLike(true);


    }
    //removes like if theres one (IT/S LIKED)
    else if(state.like.isLiked(state.recipe.id)){
        //remove like from model 
        state.like.removeLike(state.recipe.id);
        //update ui 
        likeView.removeLike(state.recipe.id);

        likeView.toggleLike(false);

    }
    likeView.likeViewShow(state.like.array)

    localStorage.setItem('likes',state.like);


}




['hashchange','load'].forEach(cur => window.addEventListener(cur,ctrlRecipe));





//clicks for list 

element.shopping.addEventListener('click',e=>{

const id= e.target.closest('.shopping__item').dataset.imemid;
console.log(id);

if (e.target.matches('.shopping__delete,.shopping__delete *')){
    state.list.deleteItem(id);
    listView.deleteItem(id);



}

})







//check if either decrease or increase was clicked
element.recipeForm.addEventListener('click',e=>{ ///am at 2 when i click i want to update and enter
    console.log(state.recipe.servings);
    if(e.target.matches('.btn-increase, .btn-increase * ')){
        if(state.recipe.servings<9){
        state.recipe.updateRecipe('inc');
        recipeView.renderUpdateRecipe('inc',state.recipe);}

    }

    else  if(e.target.matches('.btn-decrease, .btn-decrease * ')){
        if(state.recipe.servings>1){
        state.recipe.updateRecipe('dec');
        recipeView.renderUpdateRecipe('dec',state.recipe);
        }
    }
    else if (e.target.matches('.recipe__btn-add,.recipe__btn-add *')){
        if(state.recipe)
        addtoShoppinglist(state.recipe.ingredients);

    }
    else if (e.target.matches('.recipe__love, .recipe__love *')){
        ctrlLike();


    }

 
} );

//onload to get the saved recipes and display them when there are there 

window.addEventListener('load',()=>{
if(!state.like)state.like=new Like();
state.like.getFromLocalStorage();
//show the heart icon
state.like.array.forEach(cur=>{
    likeView.addLiker(cur);


    });
likeView.likeViewShow(state.like.array);



})