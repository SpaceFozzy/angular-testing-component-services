import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ExampleService } from './example.service';
import { Module } from './module.model';

/*
  Create a fake version of the ExampleService that has the exact properties
  and state that we want to test and nothing more than what is needed.
*/
const exampleServiceStub = {
  getProgrammesByWrapper(): Promise<Module[]> {
    return Promise.resolve([
      {
        id: 1,
        title: "Test Module 1",
        description: "Prow scuttle parrel provost Sail ho shrouds spirits."
      },
      {
        id: 2,
        title: "Test Module 2",
        description: "Pinnace holystone mizzenmast quarter crow's nest."
      }
    ]);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      //Provide the exampleServiceStub in place of ExampleService
      providers: [{ provide: ExampleService, useValue: exampleServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));
  
  /*
    This test will check that the getModules() function will fetch and display
    the modules in the component. It uses our fake service, but that's okay.
    Doing so, we can control exactly what we expect the service to return in
    an ideal world. That's fine -- remember, we're testing the component
    behaviour, not the service. 

    We use fakeAsync so we can use tick() and force the promise to return from
    our mock service
  */
  it('should show two test modules after getModules() is ran (fakeAsync)', fakeAsync(() => {
    const element = fixture.debugElement.nativeElement;

    component.getModules();
    tick(); // Force for the mock service to return the promise of our test modules

    //Confirm that the component modules property now has two modules
    expect(component.modules.length).toBe(2);

    //Update the UI and confirm that two list items exist for the modules
    fixture.detectChanges();
    let listItemCount = fixture.debugElement.nativeElement.querySelectorAll('li').length;
    expect(listItemCount).toBe(2);
  }));

});
