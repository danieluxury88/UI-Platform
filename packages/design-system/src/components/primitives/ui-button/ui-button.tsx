import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-button',
  styleUrl: 'ui-button.css',
  shadow: true,
})
export class UiButton {
  @Prop() variant: 'primary' | 'secondary' = 'secondary';

  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) pressed?: boolean;

  render() {
    const ariaPressed = this.pressed === undefined ? undefined : String(this.pressed);

    return (
      <Host>
        <button
          class={{
            'ui-button__control': true,
            'ui-button__control--primary': this.variant === 'primary',
            'ui-button__control--secondary': this.variant === 'secondary',
          }}
          type={this.type}
          disabled={this.disabled}
          aria-pressed={ariaPressed}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
