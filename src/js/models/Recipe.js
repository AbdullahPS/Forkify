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



}