export default (path, message) => ({
  ok: false,
  errors: [{ path, message }],
});
