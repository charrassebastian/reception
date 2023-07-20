import { Link } from 'react-router-dom'

export function NavigationBar(){
    const routes = [{to: '/', text: 'Información para recepción'},
                    {to: '/triviaEditor', text: 'Editar trivia'},
                    {to: '/spotsEditor', text: 'Editar puestos'}]
    return (
        <nav>
            <ul className='flex flex-row'>
                {routes.map(({ to, text }) => <li key={'li' + to} className='p-5'><Link to={to}>{text}</Link></li>)}
            </ul>
        </nav>
    );
}
