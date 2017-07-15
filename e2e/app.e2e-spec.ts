import { AngularServiceTestStubPage } from './app.po';

describe('angular-service-test-stub App', () => {
  let page: AngularServiceTestStubPage;

  beforeEach(() => {
    page = new AngularServiceTestStubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
