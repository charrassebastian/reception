import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TriviaElementsEditor } from './triviaElementsEditor/TriviaElementsEditor';
import { SpotsEditor } from './spotsEditor/SpotsEditor';
import { ReceptionInformation } from './receptionInformation/ReceptionInformation';
import { NavigationBar } from './navigationBar/NavigationBar';

const queryClient = new QueryClient();

export default function App() {
  return (
    <div data-testid="app" className='bg-white text-black w-screen h-screen'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<ReceptionInformation />} />
            <Route path="/triviaEditor" element={<TriviaElementsEditor />} />
            <Route path="/spotsEditor" element={<SpotsEditor />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}
