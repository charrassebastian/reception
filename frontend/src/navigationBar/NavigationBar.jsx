import { Link } from 'react-router-dom'

export function NavigationBar(){
    const routes = [{to: '/', text: 'Información para recepción'},
                    {to: '/triviaEditor', text: 'Editar trivia'},
                    {to: '/spotsEditor', text: 'Editar puestos'}]
    return (
        <nav className='sticky bg-white w-full h-14'>
            <ul className='flex flex-row items-center h-full'>
                {routes.map(({ to, text }) => <li key={'li' + to} className='px-3'><Link to={to}>{text}</Link></li>)}
            </ul>
        </nav>
    );
}
