import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-toolbar',
  styleUrl: 'ui-toolbar.css',
  shadow: true,
})
export class UiToolbar {
  @Prop() justify: 'start' | 'between' | 'center' = 'between';

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
