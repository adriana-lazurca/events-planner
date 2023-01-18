import { useState } from 'react';
import { Alert, Button, Input, Spin, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Event } from './dataTypes';
import { Component, RangePickerComponent } from './schemaTypes';
import EventModal from './EventModal';
import EventForm from './EventForm';
import { createEvent, getEvents, getSchema } from './apis/events';
import { AxiosError } from 'axios';
import { isRangePicker } from './schemaUtils';
import { EVENTS, SCHEMA } from './queryKeys';

const { Search } = Input;

function mapComponent(component: Component): ColumnType<Event> {
  return { title: component.label, dataIndex: component.name };
}

function mapRangePickerComponent(component: RangePickerComponent): ColumnsType<Event> {
  return component.name.map((name, index) => ({
    title: component.label[index],
    dataIndex: name,
  }));
}

function mapSchemaToColumns(schema?: Component[]): ColumnsType<Event> {
  return (
    schema?.flatMap((item: Component) => {
      if (isRangePicker(item)) {
        return mapRangePickerComponent(item);
      }
      return mapComponent(item);
    }) ?? []
  );
}

function addKeyToEvents(events?: Event[]): Event[] {
  return (
    events?.map((item: Event) => ({
      ...item,
      key: item.id,
    })) ?? []
  );
}

export default function EventsDashboard() {
  const {
    data: schema,
    error: schemaError,
    isError: isSchemaError,
    isLoading: isSchemaLoading,
  } = useQuery<Component[], AxiosError>([SCHEMA], getSchema);

  const {
    data: events,
    error: eventsError,
    isError: isEventsError,
    isLoading: isEventsLoading,
  } = useQuery<Event[], AxiosError>([EVENTS], getEvents);

  const { mutate: addEvent } = useMutation(createEvent);

  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => setShowModal(false);

  if (isSchemaError) {
    return <Alert message="Error" description={schemaError?.message} type="error" />;
  }
  if (isEventsError) {
    return <Alert message="Error" description={eventsError?.message} type="error" />;
  }
  if (isSchemaLoading || isEventsLoading) {
    return <Spin tip="Loading..." />;
  }

  const columns = mapSchemaToColumns(schema);
  const dataSource = addKeyToEvents(events);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5em', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: '2em' }}>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={(value: string) => console.log(value)}
          style={{ width: 200 }}
        />
        <Button onClick={() => setShowModal(true)}>Create event</Button>
        <EventModal showModal={showModal} onSave={closeModal} onCancel={closeModal}>
          <EventForm
            onClose={async (event: Event) => {
              addEvent(event);
              await queryClient.invalidateQueries([EVENTS]);
              closeModal();

              // TODO - check out refetch
              // queryClient.setQueryData([EVENTS, { id: event.id }], event);
              // refetch({ queryKey: EVENTS });
            }}
          />
        </EventModal>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
