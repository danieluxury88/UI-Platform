import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

let inputIds = 0;

@Component({
  tag: 'ui-input',
  styleUrl: '../shared/form-control.css',
  shadow: true,
})
export class UiInput {
  private readonly inputId = `ui-input-${inputIds += 1}`;

  @Prop() label = '';

  @Prop() name = '';

  @Prop() type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' = 'text';

  @Prop({ mutable: true }) value = '';

  @Prop() placeholder = '';

  @Prop() hint = '';

  @Prop() message = '';

  @Prop({ reflect: true }) required = false;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) invalid = false;

  @Event({ eventName: 'uiFieldInput', bubbles: true, composed: true })
  fieldInput!: EventEmitter<{ name: string; value: string }>;

  @Event({ eventName: 'uiFieldChange', bubbles: true, composed: true })
  fieldChange!: EventEmitter<{ name: string; value: string }>;

  private handleInput = (event: Event) => {
    const control = event.target as HTMLInputElement;
    this.value = control.value;
    this.fieldInput.emit({ name: this.name, value: this.value });
  };

  private handleChange = (event: Event) => {
    const control = event.target as HTMLInputElement;
    this.value = control.value;
    this.fieldChange.emit({ name: this.name, value: this.value });
  };

  render() {
    const describedBy = this.message ? `${this.inputId}-message` : this.hint ? `${this.inputId}-hint` : undefined;

    return (
      <Host>
        {this.label ? (
          <label class="ui-form-control__label" htmlFor={this.inputId}>
            <span>{this.label}</span>
            {this.required ? <span class="ui-form-control__required">*</span> : null}
          </label>
        ) : null}

        <input
          class="ui-form-control__input"
          id={this.inputId}
          name={this.name}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          required={this.required}
          disabled={this.disabled}
          aria-invalid={this.invalid ? 'true' : undefined}
          aria-describedby={describedBy}
          onInput={this.handleInput}
          onChange={this.handleChange}
        />

        {this.message ? (
          <p id={`${this.inputId}-message`} class="ui-form-control__message">
            {this.message}
          </p>
        ) : this.hint ? (
          <p id={`${this.inputId}-hint`} class="ui-form-control__hint">
            {this.hint}
          </p>
        ) : null}
      </Host>
    );
  }
}
