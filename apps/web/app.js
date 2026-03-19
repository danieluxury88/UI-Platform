const storageKey = 'ui-platform-theme';
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const jumpToSurface = document.getElementById('jump-to-surface');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const monthCalendar = document.getElementById('demo-calendar');
const monthCalendarSelection = document.getElementById('calendar-selection');
const monthCalendarStatus = document.getElementById('calendar-status');
const dayCalendar = document.getElementById('demo-day-calendar');
const dayCalendarSelection = document.getElementById('calendar-day-selection');
const dayCalendarStatus = document.getElementById('calendar-day-status');
const weekCalendar = document.getElementById('demo-week-calendar');
const weekCalendarSelection = document.getElementById('calendar-week-selection');
const weekCalendarStatus = document.getElementById('calendar-week-status');
const kanbanBoard = document.getElementById('demo-kanban');
const kanbanStatus = document.getElementById('kanban-status');
const taskList = document.getElementById('demo-task-list');
const taskListStatus = document.getElementById('task-list-status');
const activityTimeline = document.getElementById('demo-activity-timeline');
const checklist = document.getElementById('demo-checklist');
const checklistStatus = document.getElementById('checklist-status');
const intakeForm = document.getElementById('demo-intake-form');
const formNameInput = document.getElementById('demo-form-name');
const formOwnerInput = document.getElementById('demo-form-owner');
const formPrioritySelect = document.getElementById('demo-form-priority');
const formNotesTextarea = document.getElementById('demo-form-notes');
const formSubmitButton = document.getElementById('demo-form-submit');
const formResetButton = document.getElementById('demo-form-reset');
const formReadiness = document.getElementById('form-readiness');
const formStatus = document.getElementById('form-status');
const formSummaryProject = document.getElementById('form-summary-project');
const formSummaryOwner = document.getElementById('form-summary-owner');
const formSummaryPriority = document.getElementById('form-summary-priority');
const formSummaryNotes = document.getElementById('form-summary-notes');
const designSystemLoaderPath = '../../packages/design-system/dist/loader/index.js';

const themeColors = {
  light: '#f6f1ea',
  dark: '#171311',
};

function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`);
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + amount);
  return next;
}

function shiftMonth(dateString, offset) {
  const date = parseDate(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const targetMonthIndex = month + offset;
  const targetYear = year + Math.floor(targetMonthIndex / 12);
  const targetMonth = ((targetMonthIndex % 12) + 12) % 12;
  const daysInTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();

  return toDateString(new Date(Date.UTC(targetYear, targetMonth, Math.min(day, daysInTargetMonth))));
}

function shiftDay(dateString, offset) {
  return toDateString(addDays(parseDate(dateString), offset));
}

function formatDisplayDate(dateString, locale) {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseDate(dateString));
}

function getTheme() {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  if (toggle) {
    toggle.textContent = theme === 'dark' ? 'Switch to light' : 'Switch to dark';
    toggle.pressed = theme === 'dark';
  }
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', themeColors[theme]);
  }
}

function setTheme(theme) {
  try {
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    // Ignore storage failures and fall back to the current session theme.
  }
  applyTheme(theme);
}

async function registerDesignSystem() {
  try {
    const { defineCustomElements } = await import(designSystemLoaderPath);
    defineCustomElements(window);
  } catch (error) {
    // The demo still works before the package is built.
  }
}

function syncCalendar(calendarElement, state) {
  if (!calendarElement) {
    return;
  }

  calendarElement.view = state.view;
  calendarElement.anchorDate = state.anchorDate;
  calendarElement.selectedDate = state.selectedDate;
  calendarElement.locale = state.locale;
  calendarElement.firstDayOfWeek = state.firstDayOfWeek;
  calendarElement.events = state.events;
}

const today = toDateString(new Date());
const locale = navigator.language || 'en-US';
const tomorrow = shiftDay(today, 1);

const monthCalendarState = {
  view: 'month',
  anchorDate: today,
  selectedDate: today,
  locale,
  firstDayOfWeek: 1,
  events: [
    {
      id: 'planning-sync',
      title: 'Planning sync',
      startDate: shiftDay(today, -2),
      tone: 'neutral',
    },
    {
      id: 'launch-review',
      title: 'Launch review',
      startDate: shiftDay(today, 1),
      tone: 'accent',
    },
    {
      id: 'release-window',
      title: 'Release window',
      startDate: shiftDay(today, 7),
      endDate: shiftDay(today, 8),
      tone: 'neutral',
    },
    {
      id: 'ops-sweep',
      title: 'Ops sweep',
      startDate: shiftDay(today, 14),
      tone: 'accent',
    },
  ],
};

const dayCalendarState = {
  view: 'day',
  anchorDate: tomorrow,
  selectedDate: tomorrow,
  locale,
  firstDayOfWeek: 1,
  events: [
    {
      id: 'design-review',
      title: 'Design review',
      startDate: tomorrow,
      tone: 'accent',
    },
    {
      id: 'support-scan',
      title: 'Support scan',
      startDate: tomorrow,
      tone: 'neutral',
    },
    {
      id: 'release-signoff',
      title: 'Release signoff',
      startDate: tomorrow,
      endDate: tomorrow,
      tone: 'neutral',
    },
  ],
};

const weekCalendarState = {
  view: 'week',
  anchorDate: today,
  selectedDate: today,
  locale,
  firstDayOfWeek: 1,
  events: [
    {
      id: 'design-review',
      title: 'Design review',
      startDate: shiftDay(today, -1),
      tone: 'accent',
    },
    {
      id: 'backlog-triage',
      title: 'Backlog triage',
      startDate: today,
      tone: 'neutral',
    },
    {
      id: 'release-window',
      title: 'Release window',
      startDate: shiftDay(today, 2),
      endDate: shiftDay(today, 3),
      tone: 'accent',
    },
    {
      id: 'weekly-review',
      title: 'Weekly review',
      startDate: shiftDay(today, 5),
      tone: 'neutral',
    },
  ],
};

const kanbanBoardState = {
  columns: [
    {
      id: 'backlog',
      title: 'Backlog',
      cards: [
        {
          id: 'hierarchy-audit',
          title: 'Audit widget hierarchy',
          description: 'Confirm the next widget family still respects lower-layer boundaries.',
          meta: 'Today',
        },
        {
          id: 'copy-pass',
          title: 'Refine board copy',
          description: 'Keep shared widget language generic enough for multiple products.',
          meta: 'Queued',
          tone: 'accent',
        },
      ],
    },
    {
      id: 'active',
      title: 'In progress',
      cards: [
        {
          id: 'kanban-shell',
          title: 'Build kanban shell',
          description: 'Land a controlled board and thin activation events first.',
          meta: 'Owner: DS',
          tone: 'accent',
        },
        {
          id: 'demo-wiring',
          title: 'Wire web demo',
          description: 'Keep interaction glue in the app while the shared contract stays stable.',
          meta: 'Review',
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [
        {
          id: 'layer-cleanup',
          title: 'Tighten lower layers',
          description: 'Finish the boundary cleanup before expanding business widgets again.',
          meta: 'Complete',
        },
      ],
    },
  ],
};

const formState = {
  projectName: '',
  ownerEmail: '',
  priority: '',
  notes: '',
};

const formPriorityOptions = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'planned', label: 'Planned' },
  { value: 'exploratory', label: 'Exploratory' },
];

const activityTimelineState = {
  events: [
    {
      id: 'timeline-intake',
      title: 'Captured the first interactive request shape',
      timestamp: '09:10',
      description: 'The intake form baseline now collects a name, owner, priority, and notes without moving validation into the shared package.',
      meta: 'Today · Intake surface',
    },
    {
      id: 'timeline-kanban',
      title: 'Moved “Build kanban shell” into the active lane',
      timestamp: '10:25',
      description: 'The board slice stayed controlled while the app kept workflow decisions and persistence out of the design system.',
      meta: 'Today · Task delivery',
      tone: 'accent',
    },
    {
      id: 'timeline-task-list',
      title: 'Flattened the same task records into a compact list view',
      timestamp: '11:40',
      description: 'The app now reuses the current work items across Kanban and Task List without inventing a second shared state model.',
      meta: 'Today · Shared records',
    },
  ],
};

const checklistState = {
  handoffConfirmed: false,
};

let activeMonthEvent = null;
let activeDayEvent = null;
let activeWeekEvent = null;
let activeKanbanCard = null;
let activeTaskListItem = null;
let activeChecklistItem = null;
let submittedForm = false;

function updateMonthReadouts() {
  if (monthCalendarSelection) {
    monthCalendarSelection.textContent = `Selected: ${formatDisplayDate(
      monthCalendarState.selectedDate,
      monthCalendarState.locale,
    )}`;
  }

  if (monthCalendarStatus) {
    if (activeMonthEvent) {
      monthCalendarStatus.textContent = `Activated ${activeMonthEvent.event.title} on ${formatDisplayDate(
        activeMonthEvent.date,
        monthCalendarState.locale,
      )}.`;
    } else {
      monthCalendarStatus.textContent = 'Pick a date or activate an event chip to inspect the current month.';
    }
  }
}

function updateDayReadouts() {
  if (dayCalendarSelection) {
    dayCalendarSelection.textContent = `Selected: ${formatDisplayDate(
      dayCalendarState.selectedDate,
      dayCalendarState.locale,
    )}`;
  }

  if (dayCalendarStatus) {
    if (activeDayEvent) {
      dayCalendarStatus.textContent = `Activated ${activeDayEvent.event.title} on ${formatDisplayDate(
        activeDayEvent.date,
        dayCalendarState.locale,
      )}.`;
    } else {
      dayCalendarStatus.textContent = 'Choose the visible day or activate an event chip to inspect the agenda.';
    }
  }
}

function updateWeekReadouts() {
  if (weekCalendarSelection) {
    weekCalendarSelection.textContent = `Selected: ${formatDisplayDate(
      weekCalendarState.selectedDate,
      weekCalendarState.locale,
    )}`;
  }

  if (weekCalendarStatus) {
    if (activeWeekEvent) {
      weekCalendarStatus.textContent = `Activated ${activeWeekEvent.event.title} on ${formatDisplayDate(
        activeWeekEvent.date,
        weekCalendarState.locale,
      )}.`;
    } else {
      weekCalendarStatus.textContent = 'Move the week anchor, select a day, or activate a chip to inspect the visible range.';
    }
  }
}

function syncMonthCalendar() {
  syncCalendar(monthCalendar, monthCalendarState);
  updateMonthReadouts();
}

function syncDayCalendar() {
  syncCalendar(dayCalendar, dayCalendarState);
  updateDayReadouts();
}

function syncWeekCalendar() {
  syncCalendar(weekCalendar, weekCalendarState);
  updateWeekReadouts();
}

function syncKanbanBoard() {
  if (!kanbanBoard) {
    return;
  }

  kanbanBoard.columns = kanbanBoardState.columns;

  if (kanbanStatus) {
    kanbanStatus.textContent = activeKanbanCard
      ? `Activated ${activeKanbanCard.card.title} in ${activeKanbanCard.columnTitle}.`
      : 'Activate a card to inspect the current board interaction contract.';
  }
}

function buildTaskListItems(columns) {
  return columns.flatMap((column) =>
    column.cards.map((card) => ({
      id: card.id,
      title: card.title,
      description: card.description,
      meta: card.meta,
      statusLabel: column.title,
      tone: card.tone ?? 'neutral',
    })),
  );
}

function syncTaskList() {
  if (!taskList) {
    return;
  }

  taskList.label = 'Shared task queue';
  taskList.items = buildTaskListItems(kanbanBoardState.columns);

  if (taskListStatus) {
    taskListStatus.textContent = activeTaskListItem
      ? `Activated ${activeTaskListItem.title} from ${activeTaskListItem.statusLabel}.`
      : 'Activate a row to inspect the shared task-list interaction contract.';
  }
}

function syncActivityTimeline() {
  if (!activityTimeline) {
    return;
  }

  activityTimeline.label = 'Workspace activity';
  activityTimeline.events = activityTimelineState.events;
}

function buildChecklistItems() {
  const hasProjectName = Boolean(formState.projectName.trim());
  const hasValidOwner = Boolean(formState.ownerEmail.trim()) && !getFormErrors().ownerEmail;
  const hasPriority = Boolean(formState.priority);
  const notesLength = formState.notes.trim().length;
  const reviewReady = Object.keys(getFormErrors()).length === 0 && hasProjectName && hasValidOwner && hasPriority;

  return [
    {
      id: 'capture-name',
      title: 'Capture a clear request name',
      note: hasProjectName ? `Using “${formState.projectName.trim()}”.` : 'Add a short internal name so the handoff has a clear label.',
      meta: hasProjectName ? 'Complete' : 'Open',
      completed: hasProjectName,
    },
    {
      id: 'assign-owner',
      title: 'Assign an accountable owner',
      note: hasValidOwner ? `Owner set to ${formState.ownerEmail.trim()}.` : 'Add a valid owner email before review starts.',
      meta: hasValidOwner ? 'Complete' : 'Open',
      completed: hasValidOwner,
    },
    {
      id: 'confirm-scope',
      title: 'Confirm priority and scope notes',
      note: hasPriority
        ? `Priority selected${notesLength ? ` with ${notesLength} characters of supporting notes.` : ' with no additional notes yet.'}`
        : 'Choose a priority so the request can be triaged correctly.',
      meta: hasPriority ? 'Ready' : 'Needs triage',
      completed: hasPriority,
      tone: hasPriority ? 'accent' : 'neutral',
    },
    {
      id: 'handoff-review',
      title: 'Mark the review handoff as acknowledged',
      note: reviewReady
        ? 'This is the only manual step in the demo. Toggle it once the request is ready to leave intake.'
        : 'Finish the required intake fields before acknowledging handoff.',
      meta: checklistState.handoffConfirmed ? 'Acknowledged' : 'Pending',
      completed: reviewReady && checklistState.handoffConfirmed,
      tone: reviewReady ? 'accent' : 'neutral',
    },
  ];
}

function syncChecklist() {
  if (!checklist) {
    return;
  }

  const items = buildChecklistItems();
  checklist.label = 'Review handoff checklist';
  checklist.items = items;

  if (checklistStatus) {
    const activeItem = activeChecklistItem ? items.find((item) => item.id === activeChecklistItem.id) : null;

    checklistStatus.textContent = activeItem
      ? `${activeItem.title} is currently ${activeItem.completed ? 'complete' : 'open'}.`
      : 'Toggle a review item to inspect the controlled checklist interaction contract.';
  }
}

function getFormErrors() {
  const errors = {};

  if (!formState.projectName.trim()) {
    errors.projectName = 'Project name is required.';
  }

  if (!formState.ownerEmail.trim()) {
    errors.ownerEmail = 'Owner email is required.';
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formState.ownerEmail)) {
    errors.ownerEmail = 'Enter a valid email address.';
  }

  if (!formState.priority) {
    errors.priority = 'Choose a priority.';
  }

  if (formState.notes.trim().length > 220) {
    errors.notes = 'Keep the notes under 220 characters for this demo.';
  }

  return errors;
}

function updateFormControl(control, next) {
  if (!control) {
    return;
  }

  if ('value' in control) {
    control.value = next.value;
  }

  if ('invalid' in control) {
    control.invalid = Boolean(next.invalid);
  }

  if ('message' in control) {
    control.message = next.message ?? '';
  }
}

function syncFormDemo() {
  const errors = getFormErrors();
  const isReady = Object.keys(errors).length === 0 && Boolean(formState.projectName && formState.ownerEmail && formState.priority);

  updateFormControl(formNameInput, {
    value: formState.projectName,
    invalid: submittedForm && errors.projectName,
    message: submittedForm ? errors.projectName : '',
  });

  updateFormControl(formOwnerInput, {
    value: formState.ownerEmail,
    invalid: submittedForm && errors.ownerEmail,
    message: submittedForm ? errors.ownerEmail : '',
  });

  updateFormControl(formPrioritySelect, {
    value: formState.priority,
    invalid: submittedForm && errors.priority,
    message: submittedForm ? errors.priority : '',
  });

  if (formPrioritySelect) {
    formPrioritySelect.options = formPriorityOptions;
  }

  updateFormControl(formNotesTextarea, {
    value: formState.notes,
    invalid: submittedForm && errors.notes,
    message: submittedForm ? errors.notes : '',
  });

  if (formReadiness) {
    formReadiness.textContent = isReady ? 'Ready' : 'Incomplete';
    formReadiness.tone = isReady ? 'accent' : 'neutral';
  }

  if (formStatus) {
    formStatus.textContent = submittedForm
      ? isReady
        ? 'The current form request is valid and ready for review.'
        : 'The form still has validation issues to resolve.'
      : 'Fill the required fields to preview the current request summary.';
  }

  if (formSummaryProject) {
    formSummaryProject.textContent = formState.projectName.trim() || 'Not set';
  }

  if (formSummaryOwner) {
    formSummaryOwner.textContent = formState.ownerEmail.trim() || 'Not set';
  }

  if (formSummaryPriority) {
    const selected = formPriorityOptions.find((option) => option.value === formState.priority);
    formSummaryPriority.textContent = selected ? selected.label : 'Not set';
  }

  if (formSummaryNotes) {
    formSummaryNotes.textContent = `${formState.notes.trim().length} chars`;
  }

  if (!isReady) {
    checklistState.handoffConfirmed = false;
  }

  syncChecklist();
}

applyTheme(getTheme());

if (toggle) {
  toggle.addEventListener('click', () => {
    const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

if (jumpToSurface) {
  jumpToSurface.addEventListener('click', () => {
    document.getElementById('surface')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (monthCalendar) {
  monthCalendar.addEventListener('uiCalendarNavigate', (event) => {
    const { direction } = event.detail;

    if (direction === 'today') {
      monthCalendarState.anchorDate = today;
      monthCalendarState.selectedDate = today;
    } else if (direction === 'previous') {
      monthCalendarState.anchorDate = shiftMonth(monthCalendarState.anchorDate, -1);
    } else if (direction === 'next') {
      monthCalendarState.anchorDate = shiftMonth(monthCalendarState.anchorDate, 1);
    }

    activeMonthEvent = null;
    syncMonthCalendar();
  });

  monthCalendar.addEventListener('uiCalendarDateSelect', (event) => {
    monthCalendarState.selectedDate = event.detail.date;
    activeMonthEvent = null;
    syncMonthCalendar();
  });

  monthCalendar.addEventListener('uiCalendarEventActivate', (event) => {
    activeMonthEvent = event.detail;
    syncMonthCalendar();
  });
}

if (dayCalendar) {
  dayCalendar.addEventListener('uiCalendarNavigate', (event) => {
    const { direction } = event.detail;

    if (direction === 'today') {
      dayCalendarState.anchorDate = tomorrow;
      dayCalendarState.selectedDate = tomorrow;
    } else if (direction === 'previous') {
      dayCalendarState.anchorDate = shiftDay(dayCalendarState.anchorDate, -1);
    } else if (direction === 'next') {
      dayCalendarState.anchorDate = shiftDay(dayCalendarState.anchorDate, 1);
    }

    activeDayEvent = null;
    syncDayCalendar();
  });

  dayCalendar.addEventListener('uiCalendarDateSelect', (event) => {
    dayCalendarState.selectedDate = event.detail.date;
    activeDayEvent = null;
    syncDayCalendar();
  });

  dayCalendar.addEventListener('uiCalendarEventActivate', (event) => {
    activeDayEvent = event.detail;
    syncDayCalendar();
  });
}

if (weekCalendar) {
  weekCalendar.addEventListener('uiCalendarNavigate', (event) => {
    const { direction } = event.detail;

    if (direction === 'today') {
      weekCalendarState.anchorDate = today;
      weekCalendarState.selectedDate = today;
    } else if (direction === 'previous') {
      weekCalendarState.anchorDate = shiftDay(weekCalendarState.anchorDate, -7);
    } else if (direction === 'next') {
      weekCalendarState.anchorDate = shiftDay(weekCalendarState.anchorDate, 7);
    }

    activeWeekEvent = null;
    syncWeekCalendar();
  });

  weekCalendar.addEventListener('uiCalendarDateSelect', (event) => {
    weekCalendarState.selectedDate = event.detail.date;
    activeWeekEvent = null;
    syncWeekCalendar();
  });

  weekCalendar.addEventListener('uiCalendarEventActivate', (event) => {
    activeWeekEvent = event.detail;
    syncWeekCalendar();
  });
}

if (kanbanBoard) {
  kanbanBoard.addEventListener('uiKanbanCardActivate', (event) => {
    const column = kanbanBoardState.columns.find((candidate) => candidate.id === event.detail.columnId);
    activeKanbanCard = {
      card: event.detail.card,
      columnTitle: column ? column.title : event.detail.columnId,
    };
    syncKanbanBoard();
  });
}

if (taskList) {
  taskList.addEventListener('uiTaskListItemActivate', (event) => {
    activeTaskListItem = event.detail.item;
    syncTaskList();
  });
}

if (checklist) {
  checklist.addEventListener('uiChecklistItemToggle', (event) => {
    if (event.detail.item.id === 'handoff-review') {
      checklistState.handoffConfirmed = event.detail.nextCompleted;
    }

    activeChecklistItem = { id: event.detail.item.id };
    syncChecklist();
  });
}

if (intakeForm) {
  intakeForm.addEventListener('uiFieldInput', (event) => {
    formState[event.detail.name] = event.detail.value;
    syncFormDemo();
  });
}

if (formSubmitButton) {
  formSubmitButton.addEventListener('click', () => {
    submittedForm = true;
    syncFormDemo();
  });
}

if (formResetButton) {
  formResetButton.addEventListener('click', () => {
    submittedForm = false;
    formState.projectName = '';
    formState.ownerEmail = '';
    formState.priority = '';
    formState.notes = '';
    syncFormDemo();
  });
}

registerDesignSystem().then(() => {
  syncMonthCalendar();
  syncDayCalendar();
  syncWeekCalendar();
  syncKanbanBoard();
  syncTaskList();
  syncActivityTimeline();
  syncFormDemo();
});
