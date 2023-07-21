import { Link } from 'react-router-dom'

export function NavigationBar(){
    const routes = [{to: '/', text: 'Información para recepción'},
                    {to: '/triviaEditor', text: 'Editar trivia'},
                    {to: '/spotsEditor', text: 'Editar puestos'}]
    return (
        <nav className='bg-white w-full py-3'>
            <ul className='flex flex-row items-center h-full'>
                {routes.map(({ to, text }) => <li key={'li' + to} className='px-3'><Link to={to}>{text}</Link></li>)}
            </ul>
        </nav>
    );
}
