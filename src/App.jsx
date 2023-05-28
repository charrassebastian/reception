import { SpotsEditor } from './spotsEditor/SpotsEditor';
import { useSpots } from './hooks/fetching/useSpots';

function App() {
  const spots = useSpots();
  return (
    <div data-testid="app">
      <SpotsEditor spots={spots}/>
    </div>
  )
}

export default App
