import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  @Input() title!: string;
  @Input() routerLinkPath!: string;
  @Input() buttonText!: string;
  @Input() cardTitle!: string;
}
