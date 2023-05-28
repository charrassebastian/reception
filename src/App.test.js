import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from './App';

describe('<App />', () => {
    it('should be rendered', () => {
        render(<App />);
        expect(screen.getByTestId('app')).toBeInTheDocument();
    })

    it('should render the spots', () => {
        render(<App />);
        expect(screen.getByTestId('spots')).toBeInTheDocument();
    })
})