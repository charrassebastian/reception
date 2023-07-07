export function NavigationBar(){
    return (
        <nav>
            <ul>
                <li><Link to={'/'}>Información para recepción</Link></li>
                <li><Link to={'/triviaEditor'}>Editar trivia</Link></li>
                <li><Link to={'/spotsEditor'}>Editar puestos</Link></li>
            </ul>
        </nav>
    );
}
