import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-badge',
  styleUrl: 'ui-badge.css',
  shadow: true,
})
export class UiBadge {
  @Prop({ reflect: true }) tone: 'neutral' | 'accent' = 'neutral';

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
