import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app">
      </div>
      </QueryClientProvider>
  )
}

export default App
