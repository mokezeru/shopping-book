import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  sub: Subscription;
  editMode = false;
  edittedItemIndex: number;
  edittedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.sub = this.shoppingListService.startedEditting
      .subscribe((index: number) => {
        this.edittedItemIndex = index;
        this.editMode = true;
        this.edittedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        });
      });
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.edittedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
 }
 onClear() {
   this.slForm.reset();
   this.editMode = false;
 }
 onDelete() {
  this.shoppingListService.deleteIngredient(this.edittedItemIndex);
  this.onClear();
 }
 ngOnDestroy() {
   this.sub.unsubscribe();
 }
}
