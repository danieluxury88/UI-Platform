# ui-calendar



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute           | Description | Type                              | Default                                 |
| ---------------- | ------------------- | ----------- | --------------------------------- | --------------------------------------- |
| `anchorDate`     | `anchor-date`       |             | `string`                          | `new Date().toISOString().slice(0, 10)` |
| `events`         | --                  |             | `CalendarEventRecord[]`           | `[]`                                    |
| `firstDayOfWeek` | `first-day-of-week` |             | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0`                                     |
| `locale`         | `locale`            |             | `string`                          | `'en-US'`                               |
| `selectedDate`   | `selected-date`     |             | `string \| undefined`             | `undefined`                             |
| `view`           | `view`              |             | `"day" \| "month"`                | `'month'`                               |


## Dependencies

### Depends on

- [ui-stack](../ui-stack)
- [ui-calendar-toolbar](../ui-calendar-toolbar)
- [ui-calendar-month-view](../ui-calendar-month-view)
- [ui-calendar-day-view](../ui-calendar-day-view)

### Graph
```mermaid
graph TD;
  ui-calendar --> ui-stack
  ui-calendar --> ui-calendar-toolbar
  ui-calendar --> ui-calendar-month-view
  ui-calendar --> ui-calendar-day-view
  ui-calendar-toolbar --> ui-toolbar
  ui-calendar-toolbar --> ui-button
  ui-calendar-month-view --> ui-calendar-day-cell
  ui-calendar-month-view --> ui-calendar-event-chip
  ui-calendar-month-view --> ui-badge
  ui-calendar-day-view --> ui-button
  ui-calendar-day-view --> ui-stack
  ui-calendar-day-view --> ui-badge
  ui-calendar-day-view --> ui-calendar-event-chip
  style ui-calendar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
