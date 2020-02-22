import Search from './models/Search'
import {element} from './views/base'
import * as searchView from './views/searchView'


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
     //4>Search for recipes
       await state.search.getResult();
    //4>render results on ui 
        //console.log(state.search.result);
        searchView.renderInput(state.search.result);
        }
    

}
element.searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    ctrlSearch();
    console.log('hello');


});

