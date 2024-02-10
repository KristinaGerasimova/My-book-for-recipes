import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.less']
})
export class RecipeListComponent implements OnInit {

  // recipes$!:Observable<any[]>;
  // recipesCommentsList$!:Observable<any[]>;
  // recipesRatingsList$!:Observable<any[]>;
  // ingredientsList$!: Observable<any[]>;
  categoriesList$!: Observable<any[]>;
  categoriesList: any = [];
  // data: any;

  //Map to display data associate with foreign keys 
  categoriesListMap:Map<number, string> = new Map();

  model = {
    Name: '',
    Description: '',
    Image: '',
    Quantity: '',
    DateCreated: new Date(),
    CategoryId: '',
    totalMintues: '',
    totalSteps: '',
    ingredientsTypes: '',
    steps: ''

  }

  constructor(private router: Router,
    private service: RecipesApiService,
    private toastr: ToastrService) {

     }

 

  ngOnInit(): void {
    this.categoriesList$ = this.service.getCategories();
    this.refreshMap();
  }

  addRecipeToList(){
    this.service.addRecipes(this.model).subscribe(data=> {
      this.toastr.success('New recipe created!', 'Successful.')
        this.router.navigateByUrl('/recipes');
      
    })
  }

  refreshMap(){
    this.service.getCategories().subscribe(data => {
      this.categoriesList=data;

      for(let i = 0; i < data.length; i++)
      {
        this.categoriesListMap.set(this.categoriesList[i].id, this.categoriesList[i].categoryType);
      }
    })
  }
  
}
