# ui-calendar-toolbar



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type     | Default |
| ------------ | ------------- | ----------- | -------- | ------- |
| `rangeLabel` | `range-label` |             | `string` | `''`    |


## Events

| Event                | Description | Type                                                  |
| -------------------- | ----------- | ----------------------------------------------------- |
| `uiCalendarNavigate` |             | `CustomEvent<{ direction: CalendarNavigateAction; }>` |


## Dependencies

### Used by

 - [ui-calendar](../ui-calendar)

### Depends on

- [ui-toolbar](../../../compositions/ui-toolbar)
- [ui-button](../../../primitives/ui-button)

### Graph
```mermaid
graph TD;
  ui-calendar-toolbar --> ui-toolbar
  ui-calendar-toolbar --> ui-button
  ui-calendar --> ui-calendar-toolbar
  style ui-calendar-toolbar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
