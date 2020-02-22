import axios from'axios';

export default class Search{//exporting a class to make a query for a given searchkey 
constructor (query){
    this.query=query;

}
async getResult(){ //async function 
    try {
        const data = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
        this.result = data.data.recipes;//for encapsulation to not return it 
        }
    catch (error){
        alert(error);
    }
    
}


}




