import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { Alert, Button, Col, Input, Layout, Row, Space, Spin, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { Content, Header } from 'antd/es/layout/layout';

import { Event } from './dataTypes';
import { Component, RangePickerComponent } from './schemaTypes';
import EventModal from './EventModal';
import EventForm from './EventForm';
import { createEvent, getSchema, searchEvents } from './apis/events';
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
  const [searchText, setSearchText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
  } = useQuery<Event[], AxiosError>([EVENTS, searchQuery], () => searchEvents(searchQuery), {
    enabled: Boolean(searchQuery) || searchQuery === '',
  });

  const { mutate: addEvent } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENTS] });
    },
  });

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
    <div style={{ padding: '2.5rem 4rem' }}>
      <Row>
        <Search
          placeholder="Search events"
          allowClear
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onSearch={(text) => setSearchQuery(text)}
          style={{ width: 200 }}
        />
        <Button
          style={{ marginLeft: 'auto', color: 'white', backgroundColor: '#4d4a4a' }}
          onClick={() => setShowModal(true)}
        >
          Create event
        </Button>
      </Row>
      <Table columns={columns} dataSource={dataSource} style={{ margin: 'auto', paddingTop: '3rem' }} />
      <EventModal showModal={showModal} onSave={closeModal} onCancel={closeModal}>
        <EventForm
          onClose={async (event: Event) => {
            addEvent(event);
            closeModal();
          }}
        />
      </EventModal>
    </div>
  );
}
