import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WishlistService } from '../shopping-list/wishlist.service';
import { RecipesApiService } from './recipes-api.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less']
})
export class RecipesComponent implements OnInit {
  id:any;
  recipesList$!:Observable<any[]>;
  recipesComments$!:Observable<any[]>;
  recipesComments: any = [];

  //Map to display data associate with foreign keys 
  recipesCommentsMap:Map<number, string> = new Map();

  constructor(private route: Router,
    private router: ActivatedRoute,
    private service: RecipesApiService,
    ) { }

  ngOnInit(): void {
    this.recipesList$ = this.service.getRecipes(); 

  }

  AddNewRecipe(){
    this.route.navigateByUrl('/add-recipe'); 
  }
  // deleteRecipe(){
  //   this.router.paramMap.subscribe(params => {
  //     this.id = params.get('id');
  //     this.service.deleteRecipes(this.id).subscribe(data=>{

  //     })
  //   });
  // }

  
}
