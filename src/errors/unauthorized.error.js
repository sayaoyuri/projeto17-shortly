export function unauthorizedError() {
  return {
    name: 'UnauthorizedError',
    message: 'Sorry! You do not have permission to access the desired resource!',
  };
}
