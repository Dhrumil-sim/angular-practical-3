import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import introJs from 'intro.js';
import { Note } from '../../note.modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<{ title: string; description: string }>();
  @Input() note: Note | undefined;
  form: FormGroup;
  introJs = introJs();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: new Date(Date.now()),
    });
  }

  ngOnInit() {
    if (this.mode === 'edit' && this.note) {
      this.form.patchValue({
        title: this.note.title,
        description: this.note.description,
        date: new Date(this.note.date),
      });
    }
    this.runIntroIfFirstTime();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value as { title: string; description: string });
      this.closeModal.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private runIntroIfFirstTime(): void {
    const hasShownIntro = localStorage.getItem('hasShownModalIntro');

    if (!hasShownIntro) {
      // Show Intro.js tour
      this.introJs.setOptions({
        steps: [
          {
            element: '#step6',
            intro: 'Add valid title',
            position: 'bottom',
          },
          {
            element: '#step7',
            intro: 'Enter Description ',
            position: 'right',
          },
        ],
      });

      this.introJs.start();

      // Set the flag so it doesn't show again
      localStorage.setItem('hasShownModalIntro', 'true');
    }
  }
}
