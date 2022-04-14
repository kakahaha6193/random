import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-flip',
  templateUrl: './card-flip.component.html',
  styleUrls: ['./card-flip.component.less']
})
export class CardFlipComponent implements OnInit {
  @Input() card;
  @Input() player;
  @Input() id;
  constructor() { }

  ngOnInit(): void {
  }
  flip() {
    document.getElementById(this.id).style.transform = "rotateY(180deg)";
  }
}
