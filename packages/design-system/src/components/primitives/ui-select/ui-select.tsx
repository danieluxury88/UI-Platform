import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { normalizeSelectOptions, type UiSelectOptionRecord } from '../shared/form-utils';

let selectIds = 0;

@Component({
  tag: 'ui-select',
  styleUrl: '../shared/form-control.css',
  shadow: true,
})
export class UiSelect {
  private readonly selectId = `ui-select-${selectIds += 1}`;

  @Prop() label = '';

  @Prop() name = '';

  @Prop({ mutable: true }) value = '';

  @Prop() hint = '';

  @Prop() message = '';

  @Prop() placeholder = 'Select an option';

  @Prop() options: UiSelectOptionRecord[] = [];

  @Prop({ reflect: true }) required = false;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) invalid = false;

  @Event({ eventName: 'uiFieldInput', bubbles: true, composed: true })
  fieldInput!: EventEmitter<{ name: string; value: string }>;

  @Event({ eventName: 'uiFieldChange', bubbles: true, composed: true })
  fieldChange!: EventEmitter<{ name: string; value: string }>;

  private handleInput = (event: Event) => {
    const control = event.target as HTMLSelectElement;
    this.value = control.value;
    this.fieldInput.emit({ name: this.name, value: this.value });
  };

  private handleChange = (event: Event) => {
    const control = event.target as HTMLSelectElement;
    this.value = control.value;
    this.fieldChange.emit({ name: this.name, value: this.value });
  };

  render() {
    const describedBy = this.message ? `${this.selectId}-message` : this.hint ? `${this.selectId}-hint` : undefined;
    const options = normalizeSelectOptions(this.options);

    return (
      <Host>
        {this.label ? (
          <label class="ui-form-control__label" htmlFor={this.selectId}>
            <span>{this.label}</span>
            {this.required ? <span class="ui-form-control__required">*</span> : null}
          </label>
        ) : null}

        <select
          class="ui-form-control__select"
          id={this.selectId}
          name={this.name}
          required={this.required}
          disabled={this.disabled}
          aria-invalid={this.invalid ? 'true' : undefined}
          aria-describedby={describedBy}
          onInput={this.handleInput}
          onChange={this.handleChange}
        >
          <option value="" disabled={this.required} selected={!this.value}>
            {this.placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled} selected={option.value === this.value}>
              {option.label}
            </option>
          ))}
        </select>

        {this.message ? (
          <p id={`${this.selectId}-message`} class="ui-form-control__message">
            {this.message}
          </p>
        ) : this.hint ? (
          <p id={`${this.selectId}-hint`} class="ui-form-control__hint">
            {this.hint}
          </p>
        ) : null}
      </Host>
    );
  }
}
