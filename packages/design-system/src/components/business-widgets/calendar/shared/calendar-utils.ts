export type CalendarView = 'month' | 'day' | 'week';

export type CalendarNavigateAction = 'previous' | 'next' | 'today';

export type CalendarTone = 'neutral' | 'accent';

export type CalendarWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CalendarEventRecord {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  tone?: CalendarTone;
}

export interface CalendarDayCellModel {
  date: string;
  dayNumber: number;
  label: string;
  isToday: boolean;
  isSelected: boolean;
  isOutsideMonth: boolean;
  events: CalendarEventRecord[];
}

export interface CalendarWeekDayModel {
  date: string;
  dayNumber: number;
  dayLabel: string;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEventRecord[];
}

export interface CalendarWeekViewModel {
  rangeLabel: string;
  weekdayLabels: string[];
  days: CalendarWeekDayModel[];
}

export interface CalendarMonthGrid {
  monthLabel: string;
  weekdayLabels: string[];
  weeks: CalendarDayCellModel[][];
}

export interface CalendarDayViewModel {
  dayLabel: string;
  events: CalendarEventRecord[];
  isToday: boolean;
  isSelected: boolean;
}

function toUtcDate(value: string | Date): Date {
  if (value instanceof Date) {
    return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
  }

  return new Date(`${value}T00:00:00Z`);
}

function toDateString(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function addDays(value: Date, amount: number): Date {
  const next = new Date(value);
  next.setUTCDate(next.getUTCDate() + amount);
  return next;
}

function startOfMonth(value: Date): Date {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), 1));
}

function startOfWeek(value: Date, firstDayOfWeek: CalendarWeekday): Date {
  const offset = (value.getUTCDay() - firstDayOfWeek + 7) % 7;
  return addDays(value, -offset);
}

function endOfMonth(value: Date): Date {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + 1, 0));
}

function formatDateLabel(value: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(value);
}

function formatMonthLabel(value: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(value);
}

function formatWeekLabel(start: Date, end: Date, locale: string): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function formatDayLabel(value: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(value);
}

function formatWeekdayLabels(locale: string, firstDayOfWeek: CalendarWeekday): string[] {
  const labels: string[] = [];
  const referenceSunday = new Date(Date.UTC(2024, 0, 7));
  const start = addDays(referenceSunday, firstDayOfWeek);

  for (let index = 0; index < 7; index += 1) {
    labels.push(
      new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        timeZone: 'UTC',
      }).format(addDays(start, index)),
    );
  }

  return labels;
}

function eventRangeSort(left: CalendarEventRecord, right: CalendarEventRecord): number {
  if (left.startDate === right.startDate) {
    return left.title.localeCompare(right.title);
  }

  return left.startDate.localeCompare(right.startDate);
}

function getEventEndDate(event: CalendarEventRecord): string {
  return event.endDate ?? event.startDate;
}

function matchesEvent(date: string, event: CalendarEventRecord): boolean {
  return date >= event.startDate && date <= getEventEndDate(event);
}

function getTodayDateString(): string {
  return toDateString(new Date());
}

export function buildMonthGrid(
  anchorDate: string,
  events: CalendarEventRecord[],
  selectedDate: string | undefined,
  locale: string,
  firstDayOfWeek: CalendarWeekday,
): CalendarMonthGrid {
  const anchor = toUtcDate(anchorDate);
  const monthStart = startOfMonth(anchor);
  const monthEnd = endOfMonth(anchor);
  const gridStart = startOfWeek(monthStart, firstDayOfWeek);
  const today = getTodayDateString();
  const sortedEvents = [...events].sort(eventRangeSort);
  const weeks: CalendarDayCellModel[][] = [];

  for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
    const week: CalendarDayCellModel[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const date = addDays(gridStart, weekIndex * 7 + dayIndex);
      const dateString = toDateString(date);
      week.push({
        date: dateString,
        dayNumber: date.getUTCDate(),
        label: formatDateLabel(date, locale),
        isToday: dateString === today,
        isSelected: Boolean(selectedDate && dateString === selectedDate),
        isOutsideMonth: date < monthStart || date > monthEnd,
        events: sortedEvents.filter((event) => matchesEvent(dateString, event)),
      });
    }

    weeks.push(week);
  }

  return {
    monthLabel: formatMonthLabel(anchor, locale),
    weekdayLabels: formatWeekdayLabels(locale, firstDayOfWeek),
    weeks,
  };
}

export function formatCalendarMonthLabel(anchorDate: string, locale: string): string {
  return formatMonthLabel(toUtcDate(anchorDate), locale);
}

export function formatCalendarDayLabel(anchorDate: string, locale: string): string {
  return formatDayLabel(toUtcDate(anchorDate), locale);
}

export function formatCalendarWeekLabel(anchorDate: string, locale: string, firstDayOfWeek: CalendarWeekday): string {
  const anchor = toUtcDate(anchorDate);
  const start = startOfWeek(anchor, firstDayOfWeek);
  const end = addDays(start, 6);
  return formatWeekLabel(start, end, locale);
}

export function buildDayViewModel(
  anchorDate: string,
  events: CalendarEventRecord[],
  selectedDate: string | undefined,
  locale: string,
): CalendarDayViewModel {
  const anchor = toUtcDate(anchorDate);
  const dateString = toDateString(anchor);
  const today = getTodayDateString();

  return {
    dayLabel: formatDayLabel(anchor, locale),
    events: [...events].sort(eventRangeSort).filter((event) => matchesEvent(dateString, event)),
    isToday: dateString === today,
    isSelected: Boolean(selectedDate && selectedDate === dateString),
  };
}

export function buildWeekViewModel(
  anchorDate: string,
  events: CalendarEventRecord[],
  selectedDate: string | undefined,
  locale: string,
  firstDayOfWeek: CalendarWeekday,
): CalendarWeekViewModel {
  const anchor = toUtcDate(anchorDate);
  const start = startOfWeek(anchor, firstDayOfWeek);
  const end = addDays(start, 6);
  const sortedEvents = [...events].sort(eventRangeSort);
  const days: CalendarWeekDayModel[] = [];

  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    const date = addDays(start, dayIndex);
    const dateString = toDateString(date);
    days.push({
      date: dateString,
      dayNumber: date.getUTCDate(),
      dayLabel: new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(date),
      isToday: dateString === getTodayDateString(),
      isSelected: Boolean(selectedDate && selectedDate === dateString),
      events: sortedEvents.filter((event) => matchesEvent(dateString, event)),
    });
  }

  return {
    rangeLabel: formatWeekLabel(start, end, locale),
    weekdayLabels: formatWeekdayLabels(locale, firstDayOfWeek),
    days,
  };
}
