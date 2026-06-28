import { getGamesCsvUrl } from '../config/cms.js';

const requiredGameColumns = [
  'id',
  'active',
  'status',
  'title',
  'developer',
  'description',
  'genre',
  'tags',
  'platform',
  'image_url',
  'primary_color',
  'secondary_color',
  'shadow_color',
  'display_order',
];

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let field = '';
  let isQuoted = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"' && isQuoted && nextChar === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      isQuoted = !isQuoted;
      continue;
    }

    if (char === ',' && !isQuoted) {
      row.push(field);
      field = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !isQuoted) {
      if (char === '\r' && nextChar === '\n') index += 1;
      row.push(field);
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
      field = '';
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some((cell) => cell.trim() !== '')) rows.push(row);

  return rows;
}

function normalizeHeader(value) {
  return String(value ?? '').trim().toLowerCase();
}

function toBoolean(value) {
  return String(value ?? '').trim().toLowerCase() === 'true';
}

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeStatus(value) {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (normalized === 'coming soon') return 'Coming Soon';
  return 'Available';
}

function splitTags(value) {
  return String(value ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function mapRowToGame(row, rowIndex) {
  const status = normalizeStatus(row.status);

  return {
    id: row.id.trim(),
    active: toBoolean(row.active),
    cmsStatus: status,
    status: status === 'Available' ? 'Installed & Ready to Play' : 'Coming Soon',
    title: row.title.trim(),
    developer: row.developer.trim(),
    description: row.description.trim(),
    genre: row.genre.trim(),
    tags: splitTags(row.tags),
    platform: row.platform.trim(),
    image: row.image_url.trim(),
    image_url: row.image_url.trim(),
    themeColors: {
      primary: row.primary_color.trim() || '#3B82F6',
      secondary: row.secondary_color.trim() || '#FF3B3B',
      shadow: row.shadow_color.trim() || 'rgba(59, 130, 246, 0.3)',
    },
    displayOrder: toNumber(row.display_order, rowIndex + 1),
  };
}

function validateHeaders(headers) {
  const missingColumns = requiredGameColumns.filter((column) => !headers.includes(column));

  if (missingColumns.length > 0) {
    throw new Error('Games sheet is missing required columns: ' + missingColumns.join(', '));
  }

  const isExactOrder = requiredGameColumns.every((column, index) => headers[index] === column);
  if (!isExactOrder) {
    throw new Error('Games sheet columns must be in this exact order: ' + requiredGameColumns.join(', '));
  }
}

export async function fetchGamesSheet() {
  const response = await fetch(getGamesCsvUrl(), { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Could not load games from Google Sheets. Check that the spreadsheet is published to the web.');
  }

  const csvText = await response.text();
  const parsedRows = parseCsv(csvText);

  if (parsedRows.length < 2) {
    return [];
  }

  const headers = parsedRows[0].map(normalizeHeader);
  validateHeaders(headers);

  return parsedRows
    .slice(1)
    .map((cells) => {
      const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
      return row;
    })
    .filter((row) => row.id && row.title)
    .map(mapRowToGame)
    .sort((first, second) => first.displayOrder - second.displayOrder);
}
