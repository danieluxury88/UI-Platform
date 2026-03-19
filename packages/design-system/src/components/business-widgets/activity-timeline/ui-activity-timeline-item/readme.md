# ui-activity-timeline-item



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description | Type                          | Default     |
| -------------------- | --------- | ----------- | ----------------------------- | ----------- |
| `event` _(required)_ | --        |             | `ActivityTimelineEventRecord` | `undefined` |
| `tone`               | `tone`    |             | `"accent" \| "neutral"`       | `'neutral'` |


## Dependencies

### Used by

 - [ui-activity-timeline](../ui-activity-timeline)

### Depends on

- [ui-stack](../../../layout/ui-stack)
- [ui-badge](../../../feedback/ui-badge)

### Graph
```mermaid
graph TD;
  ui-activity-timeline-item --> ui-stack
  ui-activity-timeline-item --> ui-badge
  ui-activity-timeline --> ui-activity-timeline-item
  style ui-activity-timeline-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
