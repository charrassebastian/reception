export function Spots({ spots }) {
    return (
        <div data-testid="spots">
            {spots?.map(spot => spot.available ? <li key={spot.id}>{spot.number}</li> : undefined)}
        </div>
    )
}