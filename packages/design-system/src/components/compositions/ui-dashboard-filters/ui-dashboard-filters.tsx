import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-dashboard-filters',
  styleUrl: 'ui-dashboard-filters.css',
  shadow: true,
})
export class UiDashboardFilters {
  @Prop() label = 'Dashboard controls';

  render() {
    return (
      <Host role="group" aria-label={this.label}>
        <div class="ui-dashboard-filters">
          <div class="ui-dashboard-filters__filters">
            <slot name="filters" />
          </div>

          <div class="ui-dashboard-filters__actions">
            <slot name="actions" />
          </div>
        </div>
      </Host>
    );
  }
}
