import axios from 'axios';
import {convertFraction, element} from '../views/base';
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
            const unitIndex=arrIngredient.findIndex(el2=>units.includes(el2)); //loop throuh ingredients array
            let objIng={};
            
             if(unitIndex>-1){//there is a unit 
                /**since the unit has the number before it, we have to check if this is one 
                 *  or two digit ([1] or [1] [1/12])
                 *we save them in an variable and will get undefined in firstnum if there's jsut one digit 
                 */
                const firstNum=arrIngredient[unitIndex-2]; 
                const secondNum=arrIngredient[unitIndex-1];
                objIng.number='';
                //check for undefined and assign them to number 
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
    updateRecipe(type){
        const newServings =type==='inc'? this.servings+1 :this.servings-1;
        this.ingredients.forEach(element =>{
            const operator=parseFloat(newServings/this.servings)
            if (typeof(element.number)==="number"){
                element.number*=operator;
            if(!(Number.isInteger(element.number)))element.number=convertFraction(element.number);
           }
            else if(typeof(element.number==="string")){

                if(element.number.length==1){
                    element.number=parseInt(element.number);
                    element.number*=operator;
                     if(!(Number.isInteger(element.number)))element.number=convertFraction(element.number);}
                else if (element.number.split(/[ /]/).length===2){//this means we have a (1/3)
                    //get first num and second
                    const arrThree=element.number.split('/');
                    console.log('bingo'+arrThree);
                    const firstNum=parseInt(arrThree[0]);
                    const secondNum=parseInt(arrThree[1]);

                    //make devition
                    const newNum=parseFloat(firstNum/secondNum);
                    //multiply and convert to fraction
                    console.log(parseFloat(operator*newNum));
                    element.number=convertFraction(parseFloat(operator*newNum));
                    if(Number.isInteger(parseInt(element.number))); //for the case we got an integer here 
                    element.number=parseInt(element.number);

                    console.log(`${firstNum},${secondNum},${newNum},${element.number}`)
                }
                else  { //here we have (3 1/3) format // or 

                      //split string into number and fraction

                    const array = element.number.split(/[ /]/);

                    //get firs number  //get the fraction
                    const firstNum=parseInt(array[0]);
                    const firstFrac=parseInt(array[1]);
                    const secondFrac=parseInt(array[2]);
                    
                    //make devition  //add both together
                    const newNum=parseFloat(firstFrac/secondFrac)+firstNum;

                      //multiply and convert to fraction
                    element.number=convertFraction(parseFloat(operator*newNum));

                }
            }
        });
        this.servings=type==='inc'? this.servings+1 :this.servings-1;
    } 
   
   

    }


