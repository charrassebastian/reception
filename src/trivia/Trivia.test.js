import {render, screen} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { Trivia } from './Trivia.jsx';

describe('<Trivia />', () => {
    it('should be rendered', () => {
        render(<Trivia />);
        expect(screen.getByTestId('trivia')).toBeInTheDocument();
    })
})