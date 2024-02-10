import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesApiService } from '../recipes/recipes-api.service';
import { WishlistService } from '../shopping-list/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  recipesList$!:Observable<any[]>;
  recipesComments$!:Observable<any[]>;
  recipesCategories$!:Observable<any[]>;
  recipeByCategoryId: any;
  recipesComments: any = [];
  recipesCategories: any = [];
  recipesList: any = [];  
  recipesRecentList: any = [];

  model = {
    categoryId: ''
  }

  //Map to display data associate with foreign keys 
  recipesCommentsMap:Map<number, string> = new Map();

  constructor(private service: RecipesApiService,private route: ActivatedRoute) { }

  searchCat(id:any){
    this.service.getRecipesByCategoryId(id).subscribe(res => {
      this.recipesList = res;

    });
  }
  resetFilter(){
    this.getRecipes();
  }

  ngOnInit(): void {
    this.getRecipes();
    this.getCategories();
    this.refreshRecipesListMap();
    this.getRecipesRecentPost();
  }  

  refreshRecipesListMap(){
    this.service.getRecipes().subscribe(data => {
      this.recipesList = data;
     this.service.getCategories().subscribe(dataCategories => {});
    })
  }
  getRecipes(){
    this.service.getRecipes().subscribe(res=>{
      this.recipesList = res;
     });
  }
  getCategories(){
    this.service.getCategories().subscribe(res=>{
      this.recipesCategories = res
    });
  }

  getRecipesRecentPost(){
    this.service.getRecipesRecent().subscribe(res=> {
      this.recipesRecentList = res;
    })
  }

  

}
