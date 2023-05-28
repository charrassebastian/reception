import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { Spots } from './Spots.jsx';
import { spots } from './demoSpots.js';

describe('<Spots />', () => {
    it('should be rendered', () => {
        render(<Spots />);
        expect(screen.getByTestId('spots')).toBeInTheDocument();
    })

    it('should not render any child elements if no spots are passed as props', () => {
        render(<Spots />);
        expect(screen.getByTestId('spots').querySelectorAll('li')).toHaveLength(0);
    })

    it('should not render any spots if an empty array of spots is passed', () => {
        render(<Spots spots={[]} />);
        expect(screen.getByTestId('spots').querySelectorAll('li')).toHaveLength(0);
    })

    it('should not render any spots if only one spot is passed that is not free', () => {
        render(<Spots spots={[{ id: 1, number: 1, available: false }]} />);
        expect(screen.getByTestId('spots').querySelectorAll('li')).toHaveLength(0);
    })

    it('should render one free spot if it recieves one free spot', () => {
        render(<Spots spots={[{ id: 1, number: 1, available: true }]} />);
        expect(screen.getByTestId('spots').querySelectorAll('li')).toHaveLength(1);
    })

    it('should render only the availabe spots when multiple spots are passed', () => {
        render(<Spots spots={spots} />)
        const shownSpots = screen.getByTestId('spots').querySelectorAll('li');
        expect(shownSpots).toHaveLength(3);
        expect(shownSpots[0].textContent).toEqual('1');
        expect(shownSpots[1].textContent).toEqual('4');
        expect(shownSpots[2].textContent).toEqual('5');
    })
})