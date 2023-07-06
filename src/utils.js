// funciones originales provenientes de https://github.com/TkDodo/testing-react-query/blob/main/src/tests/utils.tsx
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
    }
})

export function renderWithClient(ui) {
    const testQueryClient = createTestQueryClient()
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    )
    return {
        ...result,
        rerender: (rerenderUi) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            ),
    }
}