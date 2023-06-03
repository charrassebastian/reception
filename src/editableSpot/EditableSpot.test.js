import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditableSpot } from './EditableSpot';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

import { useState } from 'react';

describe('<EditableSpot />', () => {
    beforeEach(() => {
        useState.mockImplementation(jest.requireActual('react').useState);
    })
    it('should be rendered', () => {
        const spot = {id: 1, number: 1, available: true};
        render(<EditableSpot initialSpot={spot}/>);
        expect(screen.getByTestId('editableSpot')).toBeInTheDocument();
    });
    it('should call handleSave with the new data of the Spot when the save button is pressed', () => {
        const handleSave = jest.fn();
        const spot = {id: 1, number: 1, available: true};
        render(<EditableSpot handleSave={handleSave} initialSpot={spot}/>);
        expect(handleSave).toHaveBeenCalledTimes(0);
        screen.getByText('Guardar').click();
        expect(handleSave).toHaveBeenCalledTimes(1);
        expect(handleSave).toHaveBeenLastCalledWith(spot);
    });
    it('should call handleDelete with the id of the Spot when the delete button is pressed', () => {
        const handleDelete = jest.fn();
        const spot = {id: 1, number: 1, available: true};
        render(<EditableSpot handleDelete={handleDelete} initialSpot={spot} />);
        expect(handleDelete).toHaveBeenCalledTimes(0);
        screen.getByText('Eliminar').click();
        expect(handleDelete).toHaveBeenCalledTimes(1);
        expect(handleDelete).toHaveBeenLastCalledWith(spot.id);
    });
    it('should display the number of the spot', () => {
        const spot = {id: 1, number: 1, available: true};
        render(<EditableSpot initialSpot={spot} />);
        expect(screen.getByDisplayValue(spot.number)).toBeInTheDocument();
    });
    it('should change the number of the spot when the corresponding input has its value modified', () => {
        const spot = {id: 1, number: 1, available: true};
        render(<EditableSpot initialSpot={spot} />);
        const numberInput = screen.getByLabelText('Número de puesto');
        expect(numberInput.value).toEqual('1');
        fireEvent.change(numberInput, {target: {value: '3'}});
        expect(screen.getByLabelText('Número de puesto').value).toEqual('3');
    });
    it('should change the availability of the spot when the corresponding checkbox has its value modified', () => {
        const spot = {id: 1, number: 1, available: true};
        render(<EditableSpot initialSpot={spot} />);
        const availabilityCheckbox = screen.getByLabelText('¿Está libre?');
        expect(availabilityCheckbox.checked).toEqual(true);
        fireEvent.click(availabilityCheckbox);
        expect(availabilityCheckbox.checked).toEqual(false);
    });
})