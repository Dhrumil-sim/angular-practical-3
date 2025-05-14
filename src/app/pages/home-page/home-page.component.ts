import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ViewChild,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { NoteListComponent } from '../../components/note-list/note-list.component';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { CardState, Note } from '../../note.modal';

@Component({
  selector: 'app-home-page',
  imports: [SearchBarComponent, NoteListComponent, NoteCardComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  @ViewChild('modalReference', { read: ViewContainerRef })
  modal!: ViewContainerRef;
  @ViewChild(NoteListComponent)
  noteListComponent!: NoteListComponent;
  public loadModal(mode: 'add' | 'edit', note?: Note, index?: number) {
    this.modal.clear();
    const modalRef: ComponentRef<ModalComponent> = this.modal.createComponent(ModalComponent);

    modalRef.instance.mode = mode;

    if (mode === 'edit' && note) {
      modalRef.instance.note = note;
    }

    modalRef.instance.closeModal.subscribe(() => {
      modalRef.destroy(); // Closes the modal
    });

    modalRef.instance.submitForm.subscribe((data) => {
      if (mode === 'edit' && typeof index === 'number') {
        this.noteListComponent.notes[index] = {
          ...data,
          state: CardState.Edited,
          date: new Date(), // update date
        };
      } else {
        this.noteListComponent.notes.push({
          ...data,
          state: CardState.New,
          date: new Date(),
        });
        this.noteListComponent.originalNotes.push({
          ...data,
          state: CardState.Edited,
          date: new Date(), // update date
        });
      }
    });
  }
  onDeleteNote(index: number): void {
    const note = this.noteListComponent.notes[index];

    // Mark as deleted for transition
    note.state = CardState.Deleted;

    // Delay physical removal from both arrays
    setTimeout(() => {
      this.noteListComponent.notes.splice(index, 1);
      this.noteListComponent.originalNotes.splice(index, 1);
    }, 500);
  }

  onSearch(query: string): void {
    this.noteListComponent.filterNotes(query);
  }
}
