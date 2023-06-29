import { fireEvent, render, renderHook, screen } from '@testing-library/react';
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
    useSpots.mockImplementation(() => ({spotCollection: [], updateSpot: () => {}, deleteSpot: () => {}, addSpot: () => {}}));
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

    it('should not display any elements when there are no spots', () => {
        render(<SpotsEditor />);
        expect(screen.getByTestId('spotsEditor').querySelectorAll('li')).toHaveLength(0);
    });

    it('should display all the spots returned by useSpots', () => {
        useSpots.mockImplementation(() => ({spotCollection: spots, updateSpot: () => {}, deleteSpot: () => {}, addSpot: () => {}}));
        render(<SpotsEditor />);
        expect(screen.getAllByTestId('editableSpot')).toHaveLength(5);
    });

    it('should display a message telling the user that the elements shown are the spots, ready for edition', () => {
        render(<SpotsEditor />);
        expect(screen.getByText('Puede editar los siguientes puestos:')).toBeInTheDocument();
    });

    it('should display an Edit spot button for each spot', () => {
        useSpots.mockImplementation(() => ({spotCollection: spots, updateSpot: () => {}, deleteSpot: () => {}, addSpot: () => {}}));
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
        useSpots.mockImplementation(() => ({spotCollection: spots, updateSpot: () => {}, deleteSpot: () => {}, addSpot: addSpot}));
        render(<SpotsEditor />);
        const addButton = screen.getByText('Agregar puesto');
        expect(addSpot).toHaveBeenCalledTimes(0);
        addButton.click();
        expect(addSpot).toHaveBeenCalledTimes(1);
    });
    it('should change the input of the new element when the user types on the keyboard', () => {
        render(<SpotsEditor />);
        const newSpotInput = screen.getByLabelText('Número de puesto');
        fireEvent.change(newSpotInput, {target: {value: '3'}});
        expect(newSpotInput.value).toEqual('3');
    });
    it('should initialize the value of the new spot input to be one more than the length of the current amount of spots', () => {
        useSpots.mockImplementation(() => ({spotCollection: spots, updateSpot: () => {}, deleteSpot: () => {}, addSpot: () => {}}));
        render(<SpotsEditor />);
        const spotsInputs = screen.getAllByLabelText('Número de puesto');
        const newSpotInput = spotsInputs[spotsInputs.length - 1];
        expect(newSpotInput.value).toEqual(String(spots.length + 1));
    });
    it('should call updateSpot when a Save button is pressed', () => {
        const updateSpot = jest.fn();
        const deleteSpot = jest.fn();
        const addSpot = jest.fn();
        useSpots.mockImplementation(() => ({ spotCollection: spots, updateSpot: updateSpot, deleteSpot: deleteSpot, addSpot: addSpot }));
        render(<SpotsEditor />);
        const saveButton = screen.getAllByText('Guardar')[0];
        expect(updateSpot).toHaveBeenCalledTimes(0);
        fireEvent.click(saveButton);
        expect(updateSpot).toHaveBeenCalledTimes(1);
        expect(updateSpot).toHaveBeenLastCalledWith(spots[0]);
    });
    it('should call deleteSpot when a Delete button is pressed', () => {
        const updateSpot = jest.fn();
        const deleteSpot = jest.fn();
        const addSpot = jest.fn();
        useSpots.mockImplementation(() => ({ spotCollection: spots, updateSpot: updateSpot, deleteSpot: deleteSpot, addSpot: addSpot }));
        render(<SpotsEditor />);
        const deleteButton = screen.getAllByText('Eliminar')[0];
        expect(deleteSpot).toHaveBeenCalledTimes(0);
        fireEvent.click(deleteButton);
        expect(deleteSpot).toHaveBeenCalledTimes(1);
        expect(deleteSpot).toHaveBeenLastCalledWith(spots[0].id);
    });
    it('should call addSpot when the Add button is pressed', () => {
        const updateSpot = jest.fn();
        const deleteSpot = jest.fn();
        const addSpot = jest.fn();
        useSpots.mockImplementation(() => ({ spotCollection: spots, updateSpot: updateSpot, deleteSpot: deleteSpot, addSpot: addSpot }));
        render(<SpotsEditor />);
        const addButton = screen.getByText('Agregar puesto');
        expect(addSpot).toHaveBeenCalledTimes(0);
        fireEvent.click(addButton);
        expect(addSpot).toHaveBeenCalledTimes(1);
        const expectedId = spots[spots.length - 1].id + 1;
        expect(addSpot).toHaveBeenLastCalledWith({id: expectedId, number: spots.length + 1, available: false});
    });
});
