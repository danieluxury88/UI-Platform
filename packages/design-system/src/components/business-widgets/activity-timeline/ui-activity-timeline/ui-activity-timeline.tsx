import { Component, Host, Prop, h } from '@stencil/core';
import { buildActivityTimelineModel, type ActivityTimelineEventRecord } from '../shared/activity-timeline-utils';

@Component({
  tag: 'ui-activity-timeline',
  styleUrl: 'ui-activity-timeline.css',
  shadow: true,
})
export class UiActivityTimeline {
  @Prop() label = 'Activity timeline';

  @Prop() events: ActivityTimelineEventRecord[] = [];

  render() {
    const timeline = buildActivityTimelineModel(this.events);

    return (
      <Host>
        <section class="ui-activity-timeline" aria-label={this.label}>
          <ui-stack space="md">
            <div class="ui-activity-timeline__head">
              <h3 class="ui-activity-timeline__title">{this.label}</h3>
              <ui-badge tone="neutral">{timeline.eventCount} events</ui-badge>
            </div>

            <div class="ui-activity-timeline__events">
              {timeline.events.map((event) => (
                <ui-activity-timeline-item key={event.id} event={event} tone={event.tone} />
              ))}
            </div>
          </ui-stack>
        </section>
      </Host>
    );
  }
}
