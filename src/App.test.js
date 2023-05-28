import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';

describe('<App />', () => {
    it('should be rendered', () => {
        render(<App />);
        expect(screen.getByTestId('app')).toBeInTheDocument();
    })

    it('should render the spots editor', () => {
        render(<App />);
        expect(screen.getByTestId('spotsEditor')).toBeInTheDocument();
    })
})