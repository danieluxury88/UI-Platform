import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-dashboard-grid',
  styleUrl: 'ui-dashboard-grid.css',
  shadow: true,
})
export class UiDashboardGrid {
  @Prop() gap: 'sm' | 'md' | 'lg' = 'md';

  @Prop() label = 'Dashboard layout';

  render() {
    return (
      <Host aria-label={this.label}>
        <slot />
      </Host>
    );
  }
}
