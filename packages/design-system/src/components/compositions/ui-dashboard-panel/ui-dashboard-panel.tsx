import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-dashboard-panel',
  styleUrl: 'ui-dashboard-panel.css',
  shadow: true,
})
export class UiDashboardPanel {
  @Prop() span: '3' | '4' | '5' | '6' | '7' | '8' | '12' = '4';

  @Prop({ reflect: true }) tone: 'surface' | 'accent' = 'surface';

  @Prop() label = '';

  render() {
    return (
      <Host role={this.label ? 'region' : undefined} aria-label={this.label || undefined}>
        <slot />
      </Host>
    );
  }
}
