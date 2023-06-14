import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() submitButtonName!: string;
  @Input() title!: string;
  @Input() isLoading = false;

  @Output() submitEvent = new EventEmitter();

  onSubmit() {
    this.submitEvent.emit();
  }
}
