/**
 * Suppress Node.js warning about experimental vm modules
 * @see https://github.com/nodejs/node/issues/30810#issuecomment-1383184769
 */
const originalEmit = process.emit;

process.emit = function (event, error) {
  if (
    event === "warning" &&
    error.name === "ExperimentalWarning" &&
    error.message.includes("VM Modules is an experimental feature and might change at any time")
  ) {
    return false;
  }

  return originalEmit.apply(process, arguments);
};
