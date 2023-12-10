export function conflictError(entity = 'Entity') {
  return {
    name: 'ConflictError',
    message: `${entity} already exists!`,
  };
}
