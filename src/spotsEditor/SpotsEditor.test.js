import { render, renderHook, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SpotsEditor } from './SpotsEditor';
import { useSpots } from '../hooks/fetching/spots/useSpots';

const spots =
    [{ id: 1, number: 1, available: true },
    { id: 2, number: 2, available: false },
    { id: 3, number: 3, available: false },
    { id: 4, number: 4, available: true },
    { id: 5, number: 5, available: true }];

jest.mock('../hooks/fetching/spots/useSpots');

beforeEach(() => {
    useSpots.mockImplementation(() => [[], () => {}, () => {}, () => {}]);
});
describe('<SpotsEditor />', () => {
    it('should be rendered', () => {
        render(<SpotsEditor />);
        expect(screen.getByTestId('spotsEditor')).toBeInTheDocument();
    });

    it('should display a title explaining the purpose of the component', () => {
        render(<SpotsEditor />);
        expect(screen.getByText('Editor de puestos')).toBeInTheDocument();
    })

    it('not display any elements when there are no spots', () => {
        render(<SpotsEditor />);
        expect(screen.getByTestId('spotsEditor').querySelectorAll('li')).toHaveLength(0);
    });

    it('should display all the spots returned by useSpots', () => {
        useSpots.mockImplementation(() => [spots, () => {}, () => {}, () => {}]);
        render(<SpotsEditor />);
        expect(screen.getAllByRole('listitem')).toHaveLength(5);
    });

    it('should display a message telling the user that the elements shown are the spots, ready for edition', () => {
        render(<SpotsEditor />);
        expect(screen.getByText('Puede editar los siguientes puestos:')).toBeInTheDocument();
    });

    it('should display an Edit spot button for each spot', () => {
        useSpots.mockImplementation(() => [spots, () => {}, () => {}, () => {}]);
        render(<SpotsEditor />);
        const buttons = screen.getAllByRole('button');
        const editButtons = buttons.filter(button => button.textContent === 'Guardar')
        expect(editButtons).toHaveLength(5);
    });

    it('should display a message telling the user that a new spot can be added', () => {
        render(<SpotsEditor />);
        expect(screen.getByText('Puede agregar un nuevo puesto:')).toBeInTheDocument();
    });

    it('should call useSpots for adding a spot when the Add spot button is pressed', () => {
        const addSpot = jest.fn();
        const newSpot = {id: 1, number: 1, available: true};
        useSpots.mockImplementation(() => [spots, () => {}, () => {}, addSpot]);
        render(<SpotsEditor />);
        const addButton = screen.getByText('Agregar puesto');
        expect(addSpot).toHaveBeenCalledTimes(0);
        addButton.click();
        expect(addSpot).toHaveBeenCalledTimes(1);
    });
});
