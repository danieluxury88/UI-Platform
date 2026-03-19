# ui-task-list



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                   | Default       |
| -------- | --------- | ----------- | ---------------------- | ------------- |
| `items`  | --        |             | `TaskListItemRecord[]` | `[]`          |
| `label`  | `label`   |             | `string`               | `'Task list'` |


## Dependencies

### Depends on

- [ui-stack](../../../layout/ui-stack)
- [ui-badge](../../../feedback/ui-badge)
- [ui-task-list-item](../ui-task-list-item)

### Graph
```mermaid
graph TD;
  ui-task-list --> ui-stack
  ui-task-list --> ui-badge
  ui-task-list --> ui-task-list-item
  ui-task-list-item --> ui-stack
  ui-task-list-item --> ui-badge
  style ui-task-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
