import axios from 'axios';
export default class Recipe{
    constructor(id){
        this.id=id;
    }
    async getRecipe() { //this function takes the id and fills in other data
        try{
            const data = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title=data.data.recipe.title;
            this.author=data.data.recipe.publisher;
            this.image=data.data.recipe.image_url;
            this.url=data.data.recipe.source_url;
            this.ingredients=data.data.recipe.ingredients;
            this.calcTime();
            this.getServings();

        } catch(error){
            console.log(error);
            alert('something wrent wrong');
        }
        }

    calcTime(){
        //assuming 15 min time per 3 ingredient
        const numIng=this.ingredients.length;
        const periods=numIng/3;
        this.time=Math.ceil(periods*15);
    }

    getServings(){this.servings=4;}
    parseIngredients(){
        //make the units in original array be like the ones in abbreviations array 
        const original = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds']; 
        const abbreviations = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units =[...abbreviations,'g','kg',]
        let ingredient = this.ingredients.map((el)=>{

             ingredient=el.toLowerCase();
             console.log(ingredient);
                original.forEach((cur,i)=>{
                    ingredient=ingredient.replace(cur,abbreviations[i]);

                });
            //remove the text inside the brackets
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            
            //
            ingredient =ingredient.replace('-',' ');
            const arrIngredient = ingredient.split(' ');
            /**find the inceces of the abbreviation
             * if -1 is returned then there is no unit
             *  if there is an index <-1 we have the index of the unit
             * sometimes there is a 'number' 'like 1 piece' we need this number to take it also  
             * */
            const unitIndex=arrIngredient.findIndex(el2=>units.includes(el2));
                console.log(arrIngredient);
            let objIng={};
            
             if(unitIndex>-1){//there is a unit 
                console.log('unit index is' +unitIndex)
                const firstNum=arrIngredient[unitIndex-2];
                const secondNum=arrIngredient[unitIndex-1];
                objIng.number='';
                typeof firstNum === 'undefined' ? objIng.number=secondNum :objIng.number=firstNum+' '+secondNum ;
      
                objIng.unit=arrIngredient[unitIndex];
                objIng.rest=arrIngredient.slice(unitIndex+1,arrIngredient.length).join(' ');

            }

            else if(parseInt(arrIngredient[0],10)){//third case string number 
                objIng.number = parseInt(arrIngredient[0],10);
                objIng.unit = '';
                objIng.rest =arrIngredient.slice(1).join(' ');
            }
            else if(unitIndex===-1){//no unit
            
                objIng.number=1;
                objIng.unit='';
                objIng.rest=ingredient;

            }
            
            return objIng;

        });
        this.ingredients = ingredient;
        
    }


}