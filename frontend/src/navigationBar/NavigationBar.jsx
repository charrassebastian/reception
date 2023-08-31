import { Link } from 'react-router-dom'
import { useState } from 'react'

export function NavigationBar() {
    const [isOpened, setIsOpened] = useState(false)
    const routes = [{ to: '/', text: 'Información para recepción' },
    { to: '/triviaEditor', text: 'Editar trivia' },
    { to: '/simpleSpotEditor', text: 'Editar un puesto' },
    { to: '/spotsEditor', text: 'Editar puestos (avanzado)' }]
    const toggleOpened = () => {
        setIsOpened(!isOpened)
    }

    return (
        <>
            <button class="fixed p-2 my-5 mx-2 flex flex-column align-center rounded-md bg-slate-800" onClick={toggleOpened}>
                <span class="material-symbols-outlined text-white">
                    menu
                </span>
            </button>
            {isOpened ?
                <nav className='p-2 bg-white flex-col h-full fixed'>
                    <button class="p-2 my-3 bg-white align-items rounded-md" onClick={toggleOpened}>
                        <span class="material-symbols-outlined">
                            menu
                        </span>
                    </button>
                    <ul>
                        {routes.map(({ to, text }) => <li key={'li' + to} className='m-2'><Link to={to}>{text}</Link></li>)}
                    </ul>
                </nav>
                : null}
        </>
    );
}
