import { Component } from '../features/events/types';

export function getSchemaLabels(schema?: Component[]): string[] {
  return schema?.flatMap((component) => component.label) ?? [];
}

export function getSchemaNames(schema?: Component[]): string[] {
  return schema?.flatMap((component) => component.name) ?? [];
}
