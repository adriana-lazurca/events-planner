import axios from 'axios';
import { Event } from '../dataTypes';
import { Component } from '../schemaTypes';
import Endpoints from './endpoints';

export const getEvents = async (): Promise<Event[]> => {
  try {
    const { data } = await axios.get(Endpoints.getEvents);
    return data;
  } catch (error) {
    console.error('No data found!', error);
    throw error;
  }
};

export const searchEvents = async (searchText: string): Promise<Event[]> => {
  try {
    const { data } = await axios.get(Endpoints.searchEvents(searchText));
    return data;
  } catch (error) {
    console.error('No data found!', error);
    throw error;
  }
};

export const createEvent = async (event: Event): Promise<Event> => {
  try {
    const { data } = await axios.post(Endpoints.getEvents, event);
    return data;
  } catch (error) {
    console.error("Can't create event!", error);
    throw error;
  }
};

export const getSchema = async (): Promise<Component[]> => {
  try {
    const { data } = await axios.get(Endpoints.getSchema);
    return data;
  } catch (error) {
    console.error('No schema found!', error);
    throw error;
  }
};
