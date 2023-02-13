import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {} from '../../../tests';
import { EventForm } from '.';
import { ClientProvider } from '../../../tests/ClientProvider';
import { Endpoints } from '../services';
import { Component, Event, SelectComponent } from '../types';

const schema: Component[] = [
  {
    name: 'title',
    label: 'Title',
    component: 'text',
    required: true,
  },
  {
    name: 'type',
    label: 'Type',
    component: 'select',
    required: true,
    options: [
      {
        label: 'Generic',
        value: 'generic',
      },
      {
        label: 'Holiday',
        value: 'holiday',
      },
    ],
  },
  {
    name: ['startDate', 'endDate'],
    label: ['Start date', 'End date'],
    rangeLabel: 'Date',
    rangeName: 'date',
    component: 'range_picker',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    component: 'textarea',
  },
];

const events: Event[] = [];

const mock = new MockAdapter(axios);
mock.onGet(Endpoints.getSchema).reply(200, schema);
mock.onGet(Endpoints.searchEvents('')).reply(200, events);

describe('When the form opens', () => {
  test('it shows a form which is getting filled in with the correct structure', async () => {
    //let actualValues;
    //let saved = false;
    const handler = jest.fn(() => Promise.resolve());

    render(
      <ClientProvider>
        <EventForm onSave={handler} />
      </ClientProvider>,
    );

    //TITLE
    const title = 'Hello';

    const titleLabel = await screen.findByLabelText('Title');
    expect(titleLabel).toBeInTheDocument();
    const titleInput = await screen.findByRole('textbox', { name: /title/i });
    await userEvent.type(titleInput, title);
    expect(titleInput).toHaveValue(title);

    // TYPE
    const typeSchema = schema.find((item): item is SelectComponent => item.component === 'select'); // needed in expected
    const typeOptions = typeSchema?.options ?? [];
    expect(typeOptions).toHaveLength(2);

    const typeLabel = await screen.findByLabelText('Type');
    expect(typeLabel).toBeInTheDocument();

    const typeInput = await screen.findByRole('combobox', { name: /type/i });
    await userEvent.click(typeInput);

    const optionToSelect = typeOptions[0].label;
    const option = screen.getByText(optionToSelect);
    await userEvent.click(option);

    const typeValueElement = typeInput.parentElement?.nextElementSibling;
    expect(typeValueElement).toHaveTextContent(optionToSelect);

    //DATE
    const startDate = '2022/12/25';
    const endDate = '2022/12/27';

    const dateLabel = await screen.findByLabelText('Date');
    expect(dateLabel).toBeInTheDocument();

    const startDateInput = await screen.findByRole('textbox', { name: /date/i });
    await userEvent.type(startDateInput, startDate);
    expect(startDateInput).toHaveAttribute('value', startDate);

    const endDateInput = await screen.findByPlaceholderText(/end date/i);
    await userEvent.type(endDateInput, endDate);
    expect(endDateInput).toHaveAttribute('value', endDate);

    //DESCRIPTION
    const description = 'Salutation';
    const descriptionLabel = await screen.findByLabelText('Description');
    expect(descriptionLabel).toBeInTheDocument();

    const descriptionInput = await screen.findByRole('textbox', { name: /description/i });
    await userEvent.type(descriptionInput, description);
    expect(descriptionInput).toHaveValue(description);

    //SUBMIT
    const submitButton = screen.getByRole('button', { name: /save/i });
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    expect(titleInput).not.toHaveAttribute('aria-invalid');
    expect(typeInput).not.toHaveAttribute('aria-invalid');
    const dateInputParent = startDateInput.parentElement?.parentElement;
    expect(dateInputParent).not.toHaveAttribute('aria-invalid');

    // expect(handler).toBeCalledWith({
    //   title,
    //   type: typeOptions[0].label,
    //   startDate,
    //   endDate,
    // });
  });
});
