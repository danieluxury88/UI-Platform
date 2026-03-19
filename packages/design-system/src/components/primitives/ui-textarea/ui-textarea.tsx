import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

let textareaIds = 0;

@Component({
  tag: 'ui-textarea',
  styleUrl: '../shared/form-control.css',
  shadow: true,
})
export class UiTextarea {
  private readonly textareaId = `ui-textarea-${textareaIds += 1}`;

  @Prop() label = '';

  @Prop() name = '';

  @Prop({ mutable: true }) value = '';

  @Prop() placeholder = '';

  @Prop() hint = '';

  @Prop() message = '';

  @Prop() rows = 5;

  @Prop({ reflect: true }) required = false;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) invalid = false;

  @Event({ eventName: 'uiFieldInput', bubbles: true, composed: true })
  fieldInput!: EventEmitter<{ name: string; value: string }>;

  @Event({ eventName: 'uiFieldChange', bubbles: true, composed: true })
  fieldChange!: EventEmitter<{ name: string; value: string }>;

  private handleInput = (event: Event) => {
    const control = event.target as HTMLTextAreaElement;
    this.value = control.value;
    this.fieldInput.emit({ name: this.name, value: this.value });
  };

  private handleChange = (event: Event) => {
    const control = event.target as HTMLTextAreaElement;
    this.value = control.value;
    this.fieldChange.emit({ name: this.name, value: this.value });
  };

  render() {
    const describedBy = this.message ? `${this.textareaId}-message` : this.hint ? `${this.textareaId}-hint` : undefined;

    return (
      <Host>
        {this.label ? (
          <label class="ui-form-control__label" htmlFor={this.textareaId}>
            <span>{this.label}</span>
            {this.required ? <span class="ui-form-control__required">*</span> : null}
          </label>
        ) : null}

        <textarea
          class="ui-form-control__textarea"
          id={this.textareaId}
          name={this.name}
          value={this.value}
          rows={this.rows}
          placeholder={this.placeholder}
          required={this.required}
          disabled={this.disabled}
          aria-invalid={this.invalid ? 'true' : undefined}
          aria-describedby={describedBy}
          onInput={this.handleInput}
          onChange={this.handleChange}
        />

        {this.message ? (
          <p id={`${this.textareaId}-message`} class="ui-form-control__message">
            {this.message}
          </p>
        ) : this.hint ? (
          <p id={`${this.textareaId}-hint`} class="ui-form-control__hint">
            {this.hint}
          </p>
        ) : null}
      </Host>
    );
  }
}
