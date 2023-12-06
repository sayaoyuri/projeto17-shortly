export function notFoundError(entity = 'Resource') {
  return {
    name: 'NotFound',
    message: `${entity} not found!`,
  };
}