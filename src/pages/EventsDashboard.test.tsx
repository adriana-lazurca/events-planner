import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
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

describe('Given: EventsDashboard component', () => {
  describe('When rendering', () => {
    test('Then it shows a table which is getting filled in with the correct data', async () => {
      render(
        <ClientProvider>
          <EventsDashboard />
        </ClientProvider>,
      );

      const labelProperty = schema[0].label;
      const titleColumn = await screen.findByText(labelProperty);
      expect(titleColumn).toBeInTheDocument();

      const headers = screen.getAllByRole('columnheader');
      headers.forEach((header, index) => expect(header).toHaveTextContent(schema[index].label));

      const rows = screen.getAllByRole('row');
      const [, ...dataRows] = rows;

      dataRows.forEach((row, rowIndex) => {
        const event: any = events[rowIndex];
        const cells = within(row).getAllByRole('cell');

        cells.forEach((cell, columnIndex) => {
          const nameProperty = schema[columnIndex].name;
          expect(cell).toHaveTextContent(event[nameProperty]);
        });
      });
    });
  });

  describe('When "Create event" button is clicked', () => {
    test('it shows a form which is getting filled in with the correct structure', async () => {
      render(
        <ClientProvider>
          <EventsDashboard />
        </ClientProvider>,
      );

      const buttons = await screen.findAllByRole('button');
      const createEventButton = buttons.find((button) => within(button).queryByText('Create event'));

      expect(createEventButton).toBeInTheDocument();
      createEventButton && userEvent.click(createEventButton);

      const modal = await screen.findByRole('dialog');
      expect(modal).toBeInTheDocument();

      const formItems = modal.querySelectorAll('.ant-form-item');
      expect(formItems).toHaveLength(schema.length);

      schema.forEach((component) => {
        const label = within(modal).getByTitle(component.label);
        expect(label).toBeInTheDocument();
      });
    });
  });
});
