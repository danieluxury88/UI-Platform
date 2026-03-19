import { Component, Host, Prop, h } from '@stencil/core';
import type { ActivityTimelineEventRecord, ActivityTimelineEventTone } from '../shared/activity-timeline-types';

@Component({
  tag: 'ui-activity-timeline-item',
  styleUrl: 'ui-activity-timeline-item.css',
  shadow: true,
})
export class UiActivityTimelineItem {
  @Prop() event!: ActivityTimelineEventRecord;

  @Prop({ reflect: true }) tone: ActivityTimelineEventTone = 'neutral';

  render() {
    return (
      <Host>
        <article class="ui-activity-timeline-item" aria-label={this.event.title}>
          <div class="ui-activity-timeline-item__rail" aria-hidden="true">
            <span class="ui-activity-timeline-item__dot"></span>
            <span class="ui-activity-timeline-item__line"></span>
          </div>

          <ui-stack space="sm">
            <div class="ui-activity-timeline-item__head">
              <div class="ui-activity-timeline-item__summary">
                <h4 class="ui-activity-timeline-item__title">{this.event.title}</h4>
                <ui-badge tone={this.tone}>{this.event.timestamp}</ui-badge>
              </div>
              {this.event.meta ? <span class="ui-activity-timeline-item__meta">{this.event.meta}</span> : null}
            </div>

            {this.event.description ? (
              <p class="ui-activity-timeline-item__description">{this.event.description}</p>
            ) : null}
          </ui-stack>
        </article>
      </Host>
    );
  }
}
