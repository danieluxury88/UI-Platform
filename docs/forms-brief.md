# Forms Brief

## Purpose

This brief defines the recommended first shared form-control direction for the design system.

The goal is to support interactive forms with reusable primitives while keeping validation, submission, and workflow rules in the host app.

## Recommended first slice

- `ui-input`
  Role: text-like input primitive with label, hint, message, and value events
- `ui-textarea`
  Role: multiline text primitive with the same basic contract
- `ui-select`
  Role: controlled select primitive for narrow option sets

Shared support:

- `primitives/shared/form-types.ts`
- `primitives/shared/form-utils.ts`
- `primitives/shared/form-control.css`

## Boundary rules

- Form controls belong in the primitive layer
- They may depend on tokens only
- App-level validation logic, submission, and domain rules stay in app code
- Field grouping or workflow-specific wrappers should only be promoted later if repetition proves it

## Scope for the first slice

In scope:

- Label and hint rendering
- Invalid state and message rendering
- Controlled value props
- Input/change events for host apps
- A web-demo integration with app-local validation

Out of scope:

- Full form schema engines
- Submission orchestration
- Async validation
- Product-specific field logic
- Complex composite field groups
