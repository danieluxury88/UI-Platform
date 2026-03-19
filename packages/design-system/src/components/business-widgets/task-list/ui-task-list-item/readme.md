# ui-task-list-item



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description | Type                    | Default     |
| ------------------- | --------- | ----------- | ----------------------- | ----------- |
| `item` _(required)_ | --        |             | `TaskListItemRecord`    | `undefined` |
| `tone`              | `tone`    |             | `"accent" \| "neutral"` | `'neutral'` |


## Events

| Event                    | Description | Type                                         |
| ------------------------ | ----------- | -------------------------------------------- |
| `uiTaskListItemActivate` |             | `CustomEvent<{ item: TaskListItemRecord; }>` |


## Dependencies

### Used by

 - [ui-task-list](../ui-task-list)

### Depends on

- [ui-stack](../../../layout/ui-stack)
- [ui-badge](../../../feedback/ui-badge)

### Graph
```mermaid
graph TD;
  ui-task-list-item --> ui-stack
  ui-task-list-item --> ui-badge
  ui-task-list --> ui-task-list-item
  style ui-task-list-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
