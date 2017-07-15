import { Injectable } from '@angular/core';

const APIResponse = [
  {id: 1, title: "First Module", description: "This is the first module that is loaded."},
  {id: 2, title: "Second Module", description: "This is the second module that is loaded."},
  {id: 3, title: "Third Module", description: "This is the third module that is loaded."}
]

@Injectable()
export class ExampleService {

  constructor() { }

  getProgrammesByWrapper(): Promise<any[]> {
    return Promise.resolve(APIResponse);
  }

}
