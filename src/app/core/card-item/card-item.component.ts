import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {
  @Input() nomeItem!: string;
  @Input() editarLink!: string;
  @Input() deletarLink!: string;
  @Input() detalhesLink?: string;
}
