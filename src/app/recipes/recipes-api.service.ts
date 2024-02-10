import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class RecipesApiService {
    readonly recipesAPIUrl = "https://localhost:7240/api";
    readonly recipesUrl = "https://localhost:7240";

    constructor(private http: HttpClient){

    }

    getRecipesRecent() {
        return this.http.get(this.recipesUrl + '/recent')
    }

    getRecipesByCategoryId(id: any){
        return this.http.get(this.recipesUrl + `/Category/${id}`)
    }

    //Recipes
    getRecipes(): Observable<any[]> {
        return this.http.get<any>(this.recipesAPIUrl + '/recipes');
    }

    getRecipesWithId(id: number|string) {
        return this.http.get<any>(this.recipesAPIUrl + `/recipes/${id}`);
    }

    addRecipes(data: any) {
        return this.http.post(this.recipesAPIUrl + '/recipes', data);
    }

    updateRecipes(id: number|string, data:any){
        return this.http.put(this.recipesAPIUrl + `/recipes/${id}`, data);
    }

    deleteRecipes(id:number|string){
        return this.http.delete(this.recipesAPIUrl + `/recipes/${id}`); 
    }

    //RecipesComments
    getRecipesComments(): Observable<any[]> {
        return this.http.get<any>(this.recipesAPIUrl + '/recipesComments');
    }

    getCommentsByRecipeId(id: any) {
        return this.http.get(this.recipesUrl + `/comments/${id}`)
    }

    addRecipesComments(data: any) {
        return this.http.post(this.recipesAPIUrl + '/recipesComments', data);
    }

    updateRecipesComments(id: number|string, data:any){
        return this.http.put(this.recipesAPIUrl + `/recipesComments/${id}`, data);
    }

    deleteRecipesComments(id:number|string){
        return this.http.delete(this.recipesAPIUrl + `/recipesComments/${id}`); 
    }

    //RecipesRating
    getRecipesRatings(): Observable<any[]> {
        return this.http.get<any>(this.recipesAPIUrl + '/recipesRatings');
    }

    addRecipesRatings(data: any) {
        return this.http.post(this.recipesAPIUrl + '/recipesRatings', data);
    }

    updateRecipesRatings(id: number|string, data:any){
        return this.http.put(this.recipesAPIUrl + `/recipesRatings/${id}`, data);
    }

    deleteRecipesRatings(id:number|string){
        return this.http.delete(this.recipesAPIUrl + `/recipesRatings/${id}`); 
    }

    //Category
    getCategories(): Observable<any[]> {
        return this.http.get<any>(this.recipesAPIUrl + '/categories');
    }

    addCategories(data: any) {
        return this.http.post(this.recipesAPIUrl + '/categories', data);
    }

    updateCategories(id: number|string, data:any){
        return this.http.put(this.recipesAPIUrl + `/categories/${id}`, data);
    }

    deleteCategories(id:number|string){
        return this.http.delete(this.recipesAPIUrl + `/categories/${id}`); 
    }

    //Ingredients
    getIngredients(): Observable<any[]> {
        return this.http.get<any>(this.recipesAPIUrl + '/ingredients');
    }

    addIngredients(data: any) {
        return this.http.post(this.recipesAPIUrl + '/ingredients', data);
    }

    updateIngredients(id: number|string, data:any){
        return this.http.put(this.recipesAPIUrl + `/ingredients/${id}`, data);
    }

    deleteIngredients(id:number|string){
        return this.http.delete(this.recipesAPIUrl + `/ingredients/${id}`); 
    }
}