import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App.jsx';

describe('<App />', () => {
    it('should be rendered', () => {
        render(<App />);
        expect(screen.getByTestId('app')).toBeInTheDocument();
    })
})