import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-dashboard-kpi-row',
  styleUrl: 'ui-dashboard-kpi-row.css',
  shadow: true,
})
export class UiDashboardKpiRow {
  @Prop({ reflect: true }) density: 'default' | 'compact' = 'compact';

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
