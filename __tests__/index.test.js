// test/app.test.js

import app from '../index.js'; // Adjust the path as necessary
import { AppHeader } from '../src/common/Header'; // Adjust the path as necessary

// Mock the AppHeader function if needed
jest.mock('../src/common/Header', () => ({
  AppHeader: jest.fn(() => '<header>Mocked Header</header>'),
}));

describe('App', () => {
  beforeEach(() => {
    // Clear the DOM before each test
    document.body.innerHTML = '';
  });

  test('should render AppHeader and app container', () => {
    app(); // Call the app function to set the innerHTML

    // Check if the AppHeader is rendered correctly
    expect(document.querySelector('header')).not.toBeNull();
    expect(document.querySelector('header').textContent).toBe('Mocked Header');
    
    // Check if the app container is rendered
    expect(document.querySelector('#app')).not.toBeNull();
  });
});
