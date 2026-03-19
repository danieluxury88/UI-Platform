# ui-checklist



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                    | Default       |
| -------- | --------- | ----------- | ----------------------- | ------------- |
| `items`  | --        |             | `ChecklistItemRecord[]` | `[]`          |
| `label`  | `label`   |             | `string`                | `'Checklist'` |


## Dependencies

### Depends on

- [ui-stack](../../../layout/ui-stack)
- [ui-badge](../../../feedback/ui-badge)
- [ui-checklist-item](../ui-checklist-item)

### Graph
```mermaid
graph TD;
  ui-checklist --> ui-stack
  ui-checklist --> ui-badge
  ui-checklist --> ui-checklist-item
  ui-checklist-item --> ui-stack
  ui-checklist-item --> ui-badge
  style ui-checklist fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
