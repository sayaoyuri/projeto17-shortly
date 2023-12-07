export function notFoundError(entity = 'Resource') {
  return {
    name: 'NotFoundError',
    message: `${entity} not found!`,
  };
}