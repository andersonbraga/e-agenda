import { Component, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
 

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent{

@Input() control: FormControl = new FormControl()
@Input() type = 'text';
@Input() placeholder = '';
@Input() isTelefone = false;
@Input() camposModificados: boolean = false;
@Input() radioButton: boolean = false;
@Input() value: any;
@Input() disabled: boolean = false;
}
