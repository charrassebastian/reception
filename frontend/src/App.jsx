import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TriviaElementsEditor } from './triviaElementsEditor/TriviaElementsEditor';
import { SpotsEditor } from './spotsEditor/SpotsEditor';
import { ReceptionInformation } from './receptionInformation/ReceptionInformation';
import { NavigationBar } from './navigationBar/NavigationBar';
import { SimpleSpotEditor } from './simpleSpotEditor/SimpleSpotEditor';
import { Licenses } from './licenses/Licenses';
import {
  FluentProvider,
  webDarkTheme
} from "@fluentui/react-components";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div data-testid="app" className='w-screen h-screen'>
      <FluentProvider theme={webDarkTheme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="h-screen w-screen bg-[url('static/background.jpg')] bg-cover bg-center bg-no-repeat">
              <div className="h-screen w-screen flex flex-col backdrop-blur-xl">
                <NavigationBar />
                <Routes>
                  <Route path="/" element={<ReceptionInformation />} />
                  <Route path="/triviaEditor" element={<TriviaElementsEditor />} />
                  <Route path="/spotsEditor" element={<SpotsEditor />} />
                  <Route path="/simpleSpotEditor" element={<SimpleSpotEditor />} />
                  <Route path="/licenses" element={<Licenses />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </FluentProvider>
    </div>
  )
}
