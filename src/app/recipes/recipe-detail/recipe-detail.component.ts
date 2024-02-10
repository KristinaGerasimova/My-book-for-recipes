import { Component, Input, OnInit, Pipe } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap } from 'rxjs';
import { WishlistService } from 'src/app/shopping-list/wishlist.service';
import { RecipesApiService } from '../recipes-api.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less']
})
export class RecipeDetailComponent implements OnInit {
  // recipes$: any;
  id:any;
  recipesList$!:Observable<any[]>;
  recipesCommentList$!:Observable<any[]>;
  test!: Observable<any> 
  commentsByRecipeId: any;
  recipeDetail = {
    image: '',
    name: '',
    totalSteps: '',
    totalMintues: '',
    ingredientsTypes: '',
    steps: ''
  }

  model = {
    text_comment: '',
    recipesId: '',
    DateCreated: new Date(),
    rating: 0
  }

  rating = 0;
  starCount = 5; 
  ratingArr: boolean[] = [];


  addedToWishlist: boolean = false;

  snackBarDuration = 1000;
  response = [
    'You broke my heart!',
    'Really?',
    'We will do better next time',
    'Glad you like it!',
    'Thank you so much!'
  ]

  // recipesCommentsList$!:Observable<any[]>;
  // recipesRatingsList$!:Observable<any[]>;
  // ingredientsList$!: Observable<any[]>;
  // categoriesList$!: Observable<any[]>;
  // recipesCommentsList: any = [];

  // //Map to display data associate with foreign keys 
  // recipesCommentsMap:Map<number, string> = new Map();
  
  
  constructor(private service: RecipesApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    private wishlistService: WishlistService) { 
      this.ratingArr = Array(this.starCount).fill(false);
    }

    counter(i: number) {
      return new Array(i);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
       this.id = params.get('id');
    });
    this.service.getRecipesWithId(this.id).subscribe(data =>{
      this.recipeDetail=data;
      // this.recipeDetail.image = data.image;
      // this.recipeDetail.ingredientsTypes = data.ingredientsTypes;
      // this.recipeDetail.name = data.name;
      // this.recipeDetail.steps = data.steps;
      // this.recipeDetail.totalMintues = data.totalMintues;
      // this.recipeDetail.totalSteps = data.totalSteps;

    });
    this.recipesCommentList$ = this.service.getRecipesComments();
    this.getCommentsForRecipes();
     
  }

  returnStar(i: number){
    if(this.rating >= i + 1){
      return 'star';
    }
    else {
      return 'star_border';
    }
  }

  check(i: number){
    this.rating = i + 1;
  }

  onClick(i: number){
    this.rating = i + 1;
    this.snackBar.open(this.response[i], '', {
      duration: this.snackBarDuration,
      panelClass: ['snack-bar']
    });
    this.model.rating = this.rating
  }

  addComment(){
    this.model.recipesId=this.id
    this.service.addRecipesComments(this.model).subscribe(()=> {
      this.toastr.success('Comment is posted!', 'Successful.')
    })
    window.location.reload();
  }

  deleteRecipe(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.service.deleteRecipes(this.id).subscribe(() => this.router.navigate(['/recipes']))      
    });  
  }

  getCommentsForRecipes(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.service.getCommentsByRecipeId(this.id).subscribe(res=> {
        this.commentsByRecipeId = res;
      })      
    });  
  }
}
