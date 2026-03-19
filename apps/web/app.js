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

let activeMonthEvent = null;
let activeDayEvent = null;
let activeWeekEvent = null;
let activeKanbanCard = null;

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

registerDesignSystem().then(() => {
  syncMonthCalendar();
  syncDayCalendar();
  syncWeekCalendar();
  syncKanbanBoard();
});
