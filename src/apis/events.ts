import axios from 'axios';
import { Event } from '../dataTypes';
import { Component } from '../schemaTypes';

export const getEvents = async (): Promise<Event[]> => {
  const url = 'http://localhost:3001/events';
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('No data found!', error);
    throw error;
  }
};

export const createEvent = async (event: Event): Promise<Event> => {
  const url = 'http://localhost:3001/events';
  try {
    const { data } = await axios.post(url, event);
    return data;
  } catch (error) {
    console.error("Can't create event!", error);
    throw error;
  }
};

export const getSchema = async (): Promise<Component[]> => {
  const url = 'http://localhost:3001/schema';
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('No schema found!', error);
    throw error;
  }
};
