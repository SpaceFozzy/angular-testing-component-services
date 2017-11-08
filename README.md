# Testing Angular Component Services

From my StackOverflow post [here](https://stackoverflow.com/questions/44649963/cannot-read-property-mobileserviceclient-of-undefined-testing/45023772#45023772). This Angular project is an example of how to test a component that depends on a service.

A recommended approach [by Google][1], rather than using the actual service, is to use a test-double for unit testing service-dependent components. While it seems to make sense to load in your required services, a unit test should really only be focused on testing your component code.
>A component-under-test doesn't have to be injected with real services. In fact, it is usually better if they are test doubles (stubs, fakes, spies, or mocks). The purpose of the spec is to test the component, not the service, and real services can be trouble.

To create a test-double `stub` of the service, define a plain old javascript object in your `.spec` file that contains the required functions or properties for the component to work in this context, like so:

    const exampleServiceStub = {
      getProgrammesByWrapper(): Promise<Module[]> {
        return Promise.resolve([
          { id: 1, title: "Test Module 1", description: "Example description." },
          { id: 2, title: "Test Module 2", description: "Example description." }
        ]);
      }
    }

You can configure your test-double to test the exact state of the service that you would like, or manipulate it later. Then list your test-double service as a provider to stand in place of your real service:

    TestBed.configureTestingModule({
       declarations: [ ExampleComponent ],
       providers:    [ {provide: ExampleService, useValue: exampleServiceStub } ]
    });

If you need to refer to your service in your test, make sure you [get it from the injector][2].

This project demonstrates this: [component][4] / [service][5] / [test with a mock service][6]. Alternatively, a component test example that users a spy with the real service is [here](https://github.com/SpaceFozzy/angular-testing-component-services/blob/master/src/app/app.component.spy.spec.ts).

  [1]: https://angular.io/guide/testing#provide-service-test-doubles
  [2]: https://angular.io/guide/testing#get-injected-services
  [3]: https://github.com/SpaceFozzy/angular-testing-component-services
  [4]: https://github.com/SpaceFozzy/angular-testing-component-services/blob/master/src/app/app.component.ts
  [5]: https://github.com/SpaceFozzy/angular-testing-component-services/blob/master/src/app/example.service.ts
  [6]: https://github.com/SpaceFozzy/angular-testing-component-services/blob/master/src/app/app.component.spec.ts
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
