# ui-activity-timeline



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                            | Default               |
| -------- | --------- | ----------- | ------------------------------- | --------------------- |
| `events` | --        |             | `ActivityTimelineEventRecord[]` | `[]`                  |
| `label`  | `label`   |             | `string`                        | `'Activity timeline'` |


## Dependencies

### Depends on

- [ui-stack](../../../layout/ui-stack)
- [ui-badge](../../../feedback/ui-badge)
- [ui-activity-timeline-item](../ui-activity-timeline-item)

### Graph
```mermaid
graph TD;
  ui-activity-timeline --> ui-stack
  ui-activity-timeline --> ui-badge
  ui-activity-timeline --> ui-activity-timeline-item
  ui-activity-timeline-item --> ui-stack
  ui-activity-timeline-item --> ui-badge
  style ui-activity-timeline fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
