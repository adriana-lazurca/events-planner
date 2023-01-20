import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import EventsDashboard from './EventsDashboard';
import {} from '../tests';
import { events, schema } from '../tests';
import { Endpoints } from '../features/events/services';

const mock = new MockAdapter(axios);
mock.onGet(Endpoints.getSchema).reply(200, schema);
mock.onGet(Endpoints.searchEvents('')).reply(200, events);

type ClientProviderProps = { children: ReactNode };
const ClientProvider = ({ children }: ClientProviderProps) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>;
};

test('renders the events dashboard page', async () => {
  render(
    <ClientProvider>
      <EventsDashboard />
    </ClientProvider>,
  );

  const titleColumn = await screen.findByText('Title');
  expect(titleColumn).toBeInTheDocument();

  const headers = screen.getAllByRole('columnheader');
  headers.forEach((header, index) => expect(header).toHaveTextContent(schema[index].label));

  const rows = screen.getAllByRole('row');
  const [, ...dataRows] = rows;

  dataRows.forEach((row, rowIndex) => {
    const event: any = events[rowIndex];
    const cells = within(row).getAllByRole('cell');

    cells.forEach((cell, columnIndex) => {
      const property = schema[columnIndex].name;
      expect(cell).toHaveTextContent(event[property]);
    });
  });
});
