const searchAliases = {
  'grand theft auto vi': ['gta', 'gta 6', 'gta6', 'gtavi', 'gta vi'],
  'marvels spider man 2': ['spiderman', 'spider man', 'spider-man'],
  'forza horizon 5': ['for'],
};

export function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function compactText(value) {
  return normalizeText(value).replace(/\s/g, '');
}

export function getInitials(value) {
  return normalizeText(value)
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('');
}

export function getSearchableValues(item) {
  const baseValues = [
    item.title,
    item.developer,
    item.genre,
    item.platform,
    item.description,
    ...(item.tags ?? []),
  ];
  const normalizedTitle = normalizeText(item.title);
  const aliases = searchAliases[normalizedTitle] ?? [];

  return [...baseValues, getInitials(item.title), ...aliases].filter(Boolean);
}

export function matchesSearch(item, searchTerm) {
  const normalizedSearch = normalizeText(searchTerm);
  if (!normalizedSearch) return true;

  const compactSearch = compactText(normalizedSearch);
  return getSearchableValues(item).some((value) => {
    const normalizedValue = normalizeText(value);
    const compactValue = compactText(value);

    return normalizedValue.includes(normalizedSearch) || compactValue.includes(compactSearch);
  });
}

export function getSuggestionScore(item, searchTerm) {
  const normalizedSearch = normalizeText(searchTerm);
  const compactSearch = compactText(normalizedSearch);
  const normalizedTitle = normalizeText(item.title);
  const compactTitle = compactText(item.title);
  const aliases = searchAliases[normalizedTitle] ?? [];

  if (aliases.some((alias) => normalizeText(alias) === normalizedSearch || compactText(alias) === compactSearch)) return 0;
  if (normalizedTitle.startsWith(normalizedSearch) || compactTitle.startsWith(compactSearch)) return 1;
  if (normalizedTitle.includes(normalizedSearch) || compactTitle.includes(compactSearch)) return 2;
  return 3;
}
