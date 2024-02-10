import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'adminpanel', component: AdminPanelComponent, canActivate:[AuthGuard]},
  { path: 'recipes', component: RecipesComponent, canActivate:[AuthGuard] },
  { path: 'recipe-detail/:id', component: RecipeDetailComponent, canActivate:[AuthGuard] },
  { path: 'add-recipe', component: RecipeListComponent, canActivate:[AuthGuard]},
  { path: 'edit-recipe/:id', component: RecipeItemComponent, canActivate:[AuthGuard,RoleGuard]},
  { path: 'shoppinglist', component: ShoppingListComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
