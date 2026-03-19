import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-chip',
  styleUrl: 'ui-chip.css',
  shadow: true,
})
export class UiChip {
  @Prop() label?: string;

  @Prop({ reflect: true }) tone: 'neutral' | 'accent' = 'neutral';

  render() {
    return (
      <Host>
        <span class="ui-chip__dot" aria-hidden="true"></span>
        <span class="ui-chip__label">{this.label ?? <slot />}</span>
      </Host>
    );
  }
}
