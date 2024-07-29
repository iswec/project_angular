import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [BtnPrimaryComponent, ReactiveFormsModule, HttpClientModule],
  providers: [
    NewsletterService,
  ],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss'
})
export class NewsletterFormComponent {
newsLetterForm!: FormGroup;
loading = signal(false);

constructor(private service: NewsletterService) {
  this.newsLetterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
 })
}

  onSubmit() {
    this.loading.set(true);
    if(this.newsLetterForm.valid) {
      this.service.sendData(this.newsLetterForm.value.name, this.newsLetterForm.value.email).subscribe({
        next: () => {
          this.newsLetterForm.reset();
          this.loading.set(false);
        }
      })
    }
  }
}
