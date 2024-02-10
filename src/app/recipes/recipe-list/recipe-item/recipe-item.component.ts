import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RecipesApiService } from '../../recipes-api.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.less']
})
export class RecipeItemComponent implements OnInit {
  id:any;
  recipeDetail:any;
  categoriesList$!: Observable<any[]>;
  categoriesList: any = [];
  data:any;

   //Map to display data associate with foreign keys 
  categoriesListMap:Map<number, string> = new Map();

  model = {
    Id: '',
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
    private route: ActivatedRoute,
    private service: RecipesApiService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoriesList$ = this.service.getCategories();
    this.refreshMap();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
     console.log(this.id); 
     this.service.getRecipesWithId(this.id).subscribe(data =>{
       this.model.Name=data.name;
       this.model.CategoryId=data.categoryId;
       this.model.DateCreated=data.dateCreated;
       this.model.Description=data.description;
       this.model.Image=data.image;
       this.model.Quantity=data.quantity;
       this.model.totalMintues=data.totalMintues;
       this.model.totalSteps = data.totalSteps;
       this.model.ingredientsTypes = data.ingredientsTypes;
       this.model.steps = data.steps;


     });
   });
  }

  goBackToRecipes(){
    
  }

  editRecipe(){
    this.model.Id = this.id;
    this.service.updateRecipes(this.id, this.model).subscribe(data=> {
      this.toastr.success('The recipe has been changed!', 'Successful.')
      this.data = data;
    })
    this.router.navigate(['/recipes']);
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
