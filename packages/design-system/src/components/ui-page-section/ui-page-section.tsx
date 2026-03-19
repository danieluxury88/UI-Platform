import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ui-page-section',
  styleUrl: 'ui-page-section.css',
  shadow: true,
})
export class UiPageSection {
  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
