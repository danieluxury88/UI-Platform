import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-stack',
  styleUrl: 'ui-stack.css',
  shadow: true,
})
export class UiStack {
  @Prop() space: 'sm' | 'md' | 'lg' = 'md';

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
