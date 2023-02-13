import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { Alert, Button, Col, Input, Layout, Row, Spin, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';

import { EventForm, EventModal } from '../features/events/components';
import { createEvent, getSchema, searchEvents } from '../features/events/services';
import { Component, Event, RangePickerComponent } from '../features/events/types';
import { isRangePicker, QueryKeys } from '../features/events/utils';

const { Search } = Input;
const { Content } = Layout;

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
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    data: schema,
    error: schemaError,
    isError: isSchemaError,
    isLoading: isSchemaLoading,
  } = useQuery<Component[], AxiosError>([QueryKeys.schema], getSchema);

  const {
    data: events,
    error: eventsError,
    isError: isEventsError,
    isLoading: isEventsLoading,
  } = useQuery<Event[], AxiosError>([QueryKeys.events, searchQuery], () => searchEvents(searchQuery));

  const queryClient = useQueryClient();

  const { mutate: addEvent } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.events] });
    },
  });

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
    <Layout style={{ background: 'none', padding: '2.5rem 4rem' }}>
      <Row justify="space-between">
        <Col>
          <Search
            placeholder="Search events"
            allowClear
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onSearch={(text) => setSearchQuery(text)}
            style={{ width: 200 }}
          />
        </Col>
        <Col>
          <Button style={{ color: 'white', backgroundColor: '#4d4a4a' }} onClick={() => setShowModal(true)}>
            Create event
          </Button>
        </Col>
      </Row>
      <Content>
        <Table columns={columns} dataSource={dataSource} style={{ margin: 'auto', paddingTop: '3rem' }} />
      </Content>
      <EventModal showModal={showModal} onSave={closeModal} onCancel={closeModal}>
        <EventForm
          onSave={(event: Event) => {
            addEvent(event);
            closeModal();
          }}
        />
      </EventModal>
    </Layout>
  );
}
