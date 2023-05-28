import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SpotsEditor } from './SpotsEditor';

const spots =
    [{ id: 1, number: 1, available: true },
    { id: 2, number: 2, available: false },
    { id: 3, number: 3, available: false },
    { id: 4, number: 4, available: true },
    { id: 5, number: 5, available: true }];

describe('<SpotsEditor />', () => {
    it('should be rendered', () => {
        render(<SpotsEditor />);
        expect(screen.getByTestId('spotsEditor')).toBeInTheDocument();
    })

    it('should not display any spot when it does not receive spots as props', () => {
        render(<SpotsEditor />);
        expect(screen.getByTestId('spotsEditor').querySelectorAll('li')).toHaveLength(0);
    })

    it('should display all the spots passed to it as props', () => {
        render(<SpotsEditor spots={spots} />);
        expect(screen.getByTestId('spotsEditor').querySelectorAll('li')).toHaveLength(5);
    })

    it('should display a message telling the user that the elements shown are the spots, ready for edition', () => {
        render(<SpotsEditor />);
        expect(screen.getByText('Puede editar los siguientes puestos:')).toBeInTheDocument();
    })
})