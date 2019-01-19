import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageSrvice {

  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipe() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-a694e.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get('https://ng-recipe-book-a694e.firebaseio.com/recipes.json?auth=' + token).pipe(map((response: Response) => {
        const recipes: Recipe[] = response.json();
        // tslint:disable-next-line:prefer-const
        for (let recipe of recipes) {
            if (!recipes['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
        }
        return recipes;
      }))
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
