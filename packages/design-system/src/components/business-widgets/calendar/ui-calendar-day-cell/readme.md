# ui-calendar-day-cell



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default |
| -------------- | --------------- | ----------- | --------- | ------- |
| `date`         | `date`          |             | `string`  | `''`    |
| `dayNumber`    | `day-number`    |             | `number`  | `0`     |
| `label`        | `label`         |             | `string`  | `''`    |
| `outsideMonth` | `outside-month` |             | `boolean` | `false` |
| `selected`     | `selected`      |             | `boolean` | `false` |
| `today`        | `today`         |             | `boolean` | `false` |


## Events

| Event                  | Description | Type                             |
| ---------------------- | ----------- | -------------------------------- |
| `uiCalendarDateSelect` |             | `CustomEvent<{ date: string; }>` |


## Dependencies

### Used by

 - [ui-calendar-month-view](../ui-calendar-month-view)
 - [ui-calendar-week-view](../ui-calendar-week-view)

### Graph
```mermaid
graph TD;
  ui-calendar-month-view --> ui-calendar-day-cell
  ui-calendar-week-view --> ui-calendar-day-cell
  style ui-calendar-day-cell fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
