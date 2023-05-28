export function SpotsEditor({ spots }) {
    return (
        <div data-testid="spotsEditor">
            <h1 className="text-xl">Puede editar los siguientes puestos:</h1>
            {spots?.length ? spots.map(spot => <li key={spot.id}>{spot.number}</li>) : <p>Ninguno</p>}
        </div>
    );
}