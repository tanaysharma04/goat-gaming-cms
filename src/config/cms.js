const env = import.meta.env ?? {};

export const gamesSheetConfig = {
  publishedCsvUrl: env.VITE_GOOGLE_SHEETS_PUBLISHED_CSV_URL ?? '',
  spreadsheetId: env.VITE_GOOGLE_SHEETS_ID ?? '',
  gamesGid: env.VITE_GOOGLE_SHEETS_GAMES_GID ?? '',
};

export function getGamesCsvUrl() {
  if (gamesSheetConfig.publishedCsvUrl) {
    return gamesSheetConfig.publishedCsvUrl;
  }

  if (gamesSheetConfig.spreadsheetId && gamesSheetConfig.gamesGid) {
    const encodedId = encodeURIComponent(gamesSheetConfig.spreadsheetId);
    const encodedGid = encodeURIComponent(gamesSheetConfig.gamesGid);
    return 'https://docs.google.com/spreadsheets/d/e/' + encodedId + '/pub?gid=' + encodedGid + '&single=true&output=csv';
  }

  throw new Error('Google Sheets CMS is not connected yet. Add VITE_GOOGLE_SHEETS_PUBLISHED_CSV_URL to your environment.');
}
