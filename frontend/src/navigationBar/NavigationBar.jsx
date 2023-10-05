import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@fluentui/react-components'
import { Navigation24Regular } from '@fluentui/react-icons'

export function NavigationBar() {
    const [isOpened, setIsOpened] = useState(false)
    const routes = [{ to: '/', text: 'Información para recepción' },
    { to: '/triviaEditor', text: 'Editar trivia' },
    { to: '/simpleSpotEditor', text: 'Editar un puesto' },
    { to: '/spotsEditor', text: 'Editor de puestos avanzado' }]
    const toggleOpened = () => {
        setIsOpened(!isOpened)
    }

    return (
        <>
            <div class="z-50 fixed m-4 flex flex-column align-center rounded-md">
                <Button icon={<Navigation24Regular />} onClick={toggleOpened}>
                </Button>
            </div>
            {isOpened ?
                <nav className='z-50 p-4 flex-col h-full fixed bg-black'>
                    <Button icon={<Navigation24Regular />} onClick={toggleOpened}>
                    </Button>
                    <ul>
                        {routes.map(({ to, text }) => <li key={'li' + to} className='m-2'><Link to={to}>{text}</Link></li>)}
                    </ul>
                </nav>
                : null}
        </>
    );
}
