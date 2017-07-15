import { Component } from '@angular/core';

import { ExampleService } from './example.service'
import { Module } from './module.model'

@Component({
  selector: 'app-root',
  template: `
  <h1>
    Angular: Testing A Service-Dependant Component
  </h1>
  <p>Status: {{status}}</p>
  <section *ngIf="modules.length" id="module-list">
    Module List:
    <ul>
      <li *ngFor="let module of modules">{{module.title}}: {{module.description}}</li>
    </ul>
  </section>
  <button (click)="getModules()">Get Modules</button>
  `
})
export class AppComponent {
  public status: string = "Ready";
  public modules: Module[] = [];
  constructor(private exampleService: ExampleService) { }

  getModules() {
    this.status = "Getting classes...";

    this.exampleService.getProgrammesByWrapper().then(((res) => {
      this.status = "Sorting classes...";
      this.displayModules(res);
      this.status = "Update success!";
    }));
  }

  displayModules(res: any) {
    this.modules = res;
  }

}
