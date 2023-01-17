import { Component, RangePickerComponent, SelectComponent, TextareaComponent, TextComponent } from './schemaTypes';

export const isRangePicker = (item: Component): item is RangePickerComponent => item.component === 'range_picker';
export const isSelect = (item: Component): item is SelectComponent => item.component === 'select';
export const isText = (item: Component): item is TextComponent => item.component === 'text';
export const isTextarea = (item: Component): item is TextareaComponent => item.component === 'textarea';
