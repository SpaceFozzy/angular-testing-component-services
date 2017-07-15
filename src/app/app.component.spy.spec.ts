import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ExampleService } from './example.service';
import { Module } from './module.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  /*
    Define the mock data we want returned from the real service. Our spy
    will watch the real service, but once the getProgrammesByWrapper()
    function is called, it will interject and return this data.
  */
  const mockData = [
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
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      // Provide the real service
      providers: [ ExampleService ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    /* 
      Get the real service from the component injector and set up the spy
      to intercept the getProgrammesByWrapper() function and return our mock data
    */
    let exampleService = fixture.debugElement.injector.get(ExampleService);
    spyOn(exampleService, 'getProgrammesByWrapper').and.returnValue(Promise.resolve(mockData));
  }));


  it('should show two test modules after getModules() is ran (fakeAsync)', fakeAsync(() => {
    const element = fixture.debugElement.nativeElement;

    component.getModules();
    tick(); // Wait for the mock service to return the promise of our test modules

    //Confirm that the component modules property now has two modules
    expect(component.modules.length).toBe(2);

    //Update the UI and confirm that two list items exist for the modules
    fixture.detectChanges();
    let listItemCount = fixture.debugElement.nativeElement.querySelectorAll('li').length;
    expect(listItemCount).toBe(2);
  }));

});
