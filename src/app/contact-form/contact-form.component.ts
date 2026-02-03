import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      from_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
  public sendEmail(e: Event) {
    e.preventDefault();

    if (this.contactForm.valid) {
      emailjs
        .sendForm('service_ugzypkd', 'template_tch4psc', e.target as HTMLFormElement, {
          publicKey: 'CaOLIzNcZxIJXL1dv',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            alert('Email envoyé avec succès!');
          },
          (error) => {
            console.log('FAILED...', (error as EmailJSResponseStatus).text);
            alert('Échec de l\'envoi de l\'email. Veuillez réessayer plus tard.');
          },
        );
    }
  }
}
