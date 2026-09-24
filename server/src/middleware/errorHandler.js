export function errorHandler(error, _request, response, _next) {
  if (!error.status || error.status >= 500) console.error(error);
  response.status(error.status || 500).json({ message: error.message || 'Internal server error' });
}
