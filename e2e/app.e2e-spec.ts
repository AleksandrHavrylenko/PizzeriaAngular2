import { HeroTutorialPage } from './app.po';

describe('hero-tutorial App', function() {
  let page: HeroTutorialPage;

  beforeEach(() => {
    page = new HeroTutorialPage();
  });

  it('should display message saying app works', () => {
    HeroTutorialPage.navigateTo();
    expect(HeroTutorialPage.getParagraphText()).toEqual('app works!');
  });
});
