import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipesApiService } from './recipes/recipes-api.service';
import { UserService } from './shared/user.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button'

import { ToastrModule } from 'ngx-toastr';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserTypeEnabledDirective } from './user-type-enabled.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    AboutusComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipesComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    UserTypeEnabledDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    MatSnackBarModule

  ],
  exports: [
    RouterModule
  ],
  providers: [RecipesApiService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
