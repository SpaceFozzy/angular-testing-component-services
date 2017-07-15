import { Component } from '@angular/core';

import { ExampleService } from './example.service'
import { Module } from './module.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public status: string = "Ready";
  public modules: Module[] = [];
  constructor (private exampleService: ExampleService) { }

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
