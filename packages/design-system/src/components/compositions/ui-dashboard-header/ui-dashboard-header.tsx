import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-dashboard-header',
  styleUrl: 'ui-dashboard-header.css',
  shadow: true,
})
export class UiDashboardHeader {
  @Prop() eyebrow = '';

  @Prop() heading = '';

  @Prop() detail = '';

  @Prop() headingLevel: '2' | '3' | '4' = '2';

  render() {
    const HeadingTag = `h${this.headingLevel}` as keyof HTMLElementTagNameMap;

    return (
      <Host>
        <div class="ui-dashboard-header">
          <div class="ui-dashboard-header__copy">
            {this.eyebrow ? <p class="ui-dashboard-header__eyebrow">{this.eyebrow}</p> : null}
            {this.heading ? <HeadingTag class="ui-dashboard-header__title">{this.heading}</HeadingTag> : null}
            {this.detail ? <p class="ui-dashboard-header__detail">{this.detail}</p> : null}
          </div>

          <div class="ui-dashboard-header__actions">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
