import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import EventsDashboard from './EventsDashboard';
import {} from '../tests';
import { events, schema, getSchemaLabels, getSchemaNames } from '../tests';
import { ClientProvider } from '../tests/ClientProvider';
import { Endpoints } from '../features/events/services';

const mock = new MockAdapter(axios);
mock.onGet(Endpoints.getSchema).reply(200, schema);
mock.onGet(Endpoints.searchEvents('')).reply(200, events);

const schemaLabels = getSchemaLabels(schema);
const schemaNames = getSchemaNames(schema);

describe('Given: EventsDashboard component', () => {
  describe('When rendering', () => {
    test('Then it shows a table which is getting filled in with the correct data', async () => {
      render(
        <ClientProvider>
          <EventsDashboard />
        </ClientProvider>,
      );

      const labelColumn = await screen.findByText(schemaLabels[0]);
      expect(labelColumn).toBeInTheDocument();

      const headers = screen.getAllByRole('columnheader');
      headers.forEach((header, index) => expect(header).toHaveTextContent(schemaLabels[index]));

      const rows = screen.getAllByRole('row');
      const [, ...dataRows] = rows;

      dataRows.forEach((row, rowIndex) => {
        const event: any = events[rowIndex];
        const cells = within(row).getAllByRole('cell');

        cells.forEach((cell, columnIndex) => {
          const nameProperty = schemaNames[columnIndex];
          expect(cell).toHaveTextContent(event[nameProperty]);
        });
      });
    });
  });

  describe('When "Create event" button is clicked', () => {
    test('it shows a modal', async () => {
      render(
        <ClientProvider>
          <EventsDashboard />
        </ClientProvider>,
      );

      const createEventButton = await screen.findByRole('button', { name: /create event/i });

      expect(createEventButton).toBeInTheDocument();
      userEvent.click(createEventButton);

      const modal = await screen.findByRole('dialog');
      expect(modal).toBeInTheDocument();
    });
  });
});
