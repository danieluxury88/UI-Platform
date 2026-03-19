const storageKey = 'ui-platform-theme';
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const designSystemLoaderPath = '../../packages/design-system/dist/loader/index.js';

const themeColors = {
  light: '#f6f1ea',
  dark: '#171311',
};

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
    // The mobile shell still renders before the package is built.
  }
}

applyTheme(getTheme());
registerDesignSystem();

if (toggle) {
  toggle.addEventListener('click', () => {
    const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}
