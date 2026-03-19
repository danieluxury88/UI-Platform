import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-panel',
  styleUrl: 'ui-panel.css',
  shadow: true,
})
export class UiPanel {
  @Prop({ reflect: true }) tone: 'surface' | 'accent' = 'surface';

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
