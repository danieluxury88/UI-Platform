# Calendar Brief

## Purpose

This brief defines the recommended architecture direction for introducing a shared calendar widget family into the design system.

The goal is to shape the business-widget layer before implementation starts. This is not a build plan for every calendar feature. It is the minimum architecture brief needed to start the work without collapsing into a single oversized component.

## Recommended architecture direction

Build the calendar as a family of components with a shared shell and shared lower-level calendar primitives.

Recommended direction:

- Use a shared calendar shell for navigation, active view, visible range, and shared events
- Implement separate view components for month, day, week, and later year
- Reuse lower-level calendar-specific building blocks across those views
- Keep app-specific concerns such as data fetching, filtering, permissions, and persistence outside the shared widget family

Do not build the calendar as one monolithic component with a large `view` switch and many conditional props. Month, day, and week views have different interaction density, rendering rules, and accessibility constraints. A component family will be easier to evolve, test, and localize.

## Proposed component family

Suggested shared business-widget hierarchy:

- `ui-calendar`
  Role: top-level shell, active view, anchor date, navigation hooks, selection events
- `ui-calendar-toolbar`
  Role: previous, next, today, current range label, view switching controls
- `ui-calendar-month-view`
  Role: month grid, day cells, compact event rendering, overflow indicators
- `ui-calendar-day-view`
  Role: single-day rendering, likely agenda-style or basic time-slot layout first
- `ui-calendar-week-view`
  Role: single-week layout after day and month behavior are stable
- `ui-calendar-multiweek-view`
  Role: optional bridge between month and week only if a real product need appears
- `ui-calendar-year-view`
  Role: dense overview, summary-oriented, later than the other views

Suggested lower shared calendar building blocks:

- `ui-calendar-day-cell`
  Role: reusable date cell shell
- `ui-calendar-event-chip`
  Role: compact event representation in dense views
- `ui-calendar-range-label`
  Role: formatted visible range display if reuse justifies it
- `ui-calendar-time-slot`
  Role: timed slot primitive for day and week views

## Hierarchy and boundaries

Use the existing layer model:

- Tokens: color, spacing, radius, typography, motion
- Primitives: buttons, inputs, small controls
- Surfaces: card and panel framing
- Layout: stack, grid, page helpers
- Feedback: badges, chips, inline status
- Compositions: toolbar-like shared structures
- Business widgets: calendar views and date-specific logic

Calendar belongs in the business-widget layer, but it should reuse lower shared layers instead of recreating them.

Belongs in shared business widgets:

- View switching
- Visible range calculation
- Date selection model
- Keyboard navigation model
- Event normalization for supported views
- View-specific rendering rules

Belongs in lower shared layers:

- Buttons and other controls used by the toolbar
- Generic surface and layout helpers
- Shared feedback styling such as chips or badges

Belongs in app-level code:

- Data fetching
- Product-specific filters
- Permissions
- Persistence
- Domain-specific event actions
- Backend event schemas
- Resource planning rules unless reuse is proven

## Month-first milestone scope

The first milestone should prove the architecture without taking on the hardest scheduling problems.

Recommended first milestone:

- `ui-calendar`
- `ui-calendar-toolbar`
- `ui-calendar-month-view`
- `ui-calendar-day-cell`
- `ui-calendar-event-chip`

Milestone capabilities:

- Controlled `anchorDate`
- Controlled `view` with `month` as the only supported value initially
- Previous, next, and today navigation events
- Date selection event
- Event activation event
- Compact rendering for simple events inside month cells
- Locale-aware weekday and month labels
- First-day-of-week configuration

## Phased rollout order

Recommended view order:

1. Month
2. Day
3. Week
4. Multi-week only if product needs it
5. Year later

Why this order:

- Month view is the best first proof of date math, localization, range calculation, and compact event rendering
- Day view can follow once the shell, navigation, and selection model are stable
- Week view introduces denser timed layout and collision handling, so it should come after the simpler views
- Multi-week is optional and should not be assumed if month and week already cover the product need
- Year view is valuable for overview but should come late because it is easy to over-design early

## API and state recommendations

Prefer a controlled API for the main calendar state.

Recommended controlled inputs:

- `view`
- `anchorDate`
- `events`
- locale and week-start configuration

Recommended emitted events:

- `calendarNavigate`
- `calendarViewChange`
- `calendarDateSelect`
- `calendarEventActivate`

State guidance:

- Keep visible-range derivation centralized rather than recalculating differently in each view
- Keep selection state separate from focus state
- Normalize event data before view rendering so each view consumes a stable internal shape
- Allow simple uncontrolled defaults only for demos, not as the primary product contract

## Accessibility concerns

These need to influence the design before coding starts:

- Keyboard navigation between dates and controls
- A clear distinction between focused date and selected date
- Screen-reader labels for dates, today, selected state, and event counts
- Appropriate semantics for each view
- Predictable tab order between toolbar and active view
- Focus retention when navigating between ranges or changing views

Month and year-style views will likely need grid-style semantics. Day and week views may need different semantics depending on whether they behave more like a schedule, list, or timed grid.

## Localization concerns

These also need early decisions:

- Locale-aware month and weekday labels
- Configurable first day of week
- Localized date formatting for visible range labels
- 12-hour versus 24-hour time display for day and week views
- A clear timezone model for displayed events

The first milestone can assume one presentation timezone, but that assumption should be explicit in the API and documentation.

## Explicitly out of scope for milestone 1

Do not include these in the first calendar milestone:

- Drag and drop
- Event resize interactions
- Recurrence editing
- Resource calendars
- Timezone editing UX
- External sync behavior
- Dense overlapping timed-event layout
- Year view
- Multi-week view unless a real product need forces it in
- Product-specific filters and workflows

## Key decisions to settle before implementation

1. Confirm that the calendar will be a component family, not a monolith.
2. Confirm the minimum shared event shape for month-first rendering.
3. Decide whether the day view starts as agenda-style or time-slot based.
4. Decide the first supported timezone model for displayed events.
5. Decide whether view switching lives inside `ui-calendar` or is always controlled by the host app.
6. Decide whether event creation is in scope for the first implementation or deferred until after read and select flows are stable.

## Recommended next step

Before coding, settle the decisions above and write a small API sketch for:

- `ui-calendar`
- `ui-calendar-month-view`
- the shared event data shape

That will reduce the risk of implementing the month view with assumptions that break day and week later.
