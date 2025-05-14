import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserModule } from '@angular/platform-browser';
import introJs from 'intro.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'note-app';
  introJs = introJs();
  ngOnInit() {
    this.introJs.setOptions({
      steps: [  
        {
          element: '#step1',
          intro: 'Welcome to your new app!',
          position: 'bottom',
        },
        {
          element: '#step2',
          intro: 'Search your notes from here !',
          position: 'right',
        },
        {
          element: '#step3',
          intro: "let's add note by click on this add note button",
          position: 'top',
        },
        {
          element: '#step4',
          intro: 'Here is your list of notes',
          position: 'right',
        },
      ],
      showProgress: true,
    });
    this.introJs.start();
  }
}
