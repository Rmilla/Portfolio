import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

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
  isSending = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialiser EmailJS
    emailjs.init(environment.emailjs.publicKey);
    
    this.contactForm = this.fb.group({
      from_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  public sendEmail() {
    if (this.contactForm.invalid) return;
    this.isSending = true;
    emailjs.send(
      environment.emailjs.serviceId,
      environment.emailjs.templateId,
      this.contactForm.value,
      {
        publicKey: environment.emailjs.publicKey,
      }
    )
    .then(() => {
      alert('Email envoyé avec succès!');
      this.contactForm.reset();
      this.isSending = false;
    })
    .catch((error) => {
      console.error('FAILED...', error);
      alert("Échec de l'envoi.");
      this.isSending = false;
  })
}
}
