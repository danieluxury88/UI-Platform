import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-stat-card',
  styleUrl: 'ui-stat-card.css',
  shadow: true,
})
export class UiStatCard {
  @Prop() label = '';

  @Prop() value = '';

  @Prop() meta = '';

  @Prop() status = '';

  @Prop({ reflect: true }) size: 'default' | 'compact' = 'default';

  @Prop({ reflect: true }) tone: 'surface' | 'accent' = 'surface';

  render() {
    const accessibleLabel = [this.label, this.value, this.meta, this.status].filter(Boolean).join('. ');

    return (
      <Host aria-label={accessibleLabel || undefined}>
        <div class="ui-stat-card">
          <p class="ui-stat-card__label">{this.label}</p>
          <p class="ui-stat-card__value">{this.value}</p>
          {this.status ? <p class="ui-stat-card__status">{this.status}</p> : null}
          {this.meta ? <p class="ui-stat-card__meta">{this.meta}</p> : null}
        </div>
      </Host>
    );
  }
}
