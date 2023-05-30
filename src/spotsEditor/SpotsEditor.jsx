export function SpotsEditor({ spots }) {
    return (
        <div data-testid="spotsEditor">
            <h1 className="text-xl">Puede editar los siguientes puestos:</h1>
            {spots?.length ?
                <ul>
                    {spots.map(spot => spot?.id ? <li key={spot.id.toString()}>{spot.number}</li> : undefined)}
                </ul>
                : <p>Ninguno</p>}
        </div>
    );
}