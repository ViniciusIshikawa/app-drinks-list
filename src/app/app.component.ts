import { Component, ElementRef, OnInit, ViewChild, NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatInputModule, 
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('drinkNameInput') drinkNameInput: ElementRef<HTMLInputElement>;

  drinkForm: FormGroup; 
  itenAmountValue: number = 0;
  warmDrinkList: string[] = [];
  coldDrinkList: string[] = [];
  
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.drinkForm = this.formBuilder.group({
      itenName: [''],
      drinkType: ['warm']
    });
  }

  addDrink() {
    let inputIten: string = this.drinkForm.get('itenName').value.trim();  
    let selectedDrinkType: string =  this.drinkForm.get('drinkType').value.trim();  

    if(inputIten !== '') {
      if(selectedDrinkType === 'warm') {
        this.warmDrinkList.push(`${this.itenAmountValue}x ${this.drinkForm.get('itenName').value.trim()}`);
      } else {
        this.coldDrinkList.push(`${this.itenAmountValue}x ${this.drinkForm.get('itenName').value.trim()}`);
      }

      this.drinkForm.patchValue({
        itenName: ''
      });

      this.itenAmountValue = 0;
    }   
    
    this.drinkNameInput.nativeElement.focus();
  }

  deleteAllItens() {
    this.warmDrinkList = [];
    this.coldDrinkList = [];
    this.itenAmountValue = 0;
  }

  deleteSelectedWarmIten(index: number) {
    this.warmDrinkList.splice(index, 1);
  }

  deleteSelectedColdIten(index: number) {
    this.coldDrinkList.splice(index, 1);
  }

  addItenAmount() {
    this.itenAmountValue++;
  }

  decreaseItenAmount() {
    if(this.itenAmountValue !== 0) this.itenAmountValue--;
  }
}
