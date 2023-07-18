import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TriviaElementsEditor } from './triviaElementsEditor/TriviaElementsEditor';
import { SpotsEditor } from './spotsEditor/SpotsEditor';
import { ReceptionInformation } from './receptionInformation/ReceptionInformation';
import { NavigationBar } from './navigationBar/NavigationBar';

const queryClient = new QueryClient();

export default function App() {
  /*
      <QueryClientProvider client={queryClient}>
        <NavigationBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ReceptionInformation />} />
            <Route path="/triviaEditor" element={<TriviaElementsEditor />} />
            <Route path="/spotEditor" element={<SpotsEditor />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      */
  return (
    <div data-testid="app">
      hola
    </div>
  )
}
