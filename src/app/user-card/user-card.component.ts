import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Card with multiple sections
 */
@Component({
  standalone: true,
  selector: 'user-card',
  templateUrl: 'user-card.component.html',
  styleUrl: 'user-card.component.sass',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {

  @Input() usuario : any = null;

}
