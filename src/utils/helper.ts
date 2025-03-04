export interface SingleLineLogger {
  start: (message: string) => void;
  update: (message: string) => void;
  done: (message: string) => void;
}

export const singleLineLogger: SingleLineLogger = (() => {
  let spinnerInterval: NodeJS.Timeout | null = null;
  const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let frameIndex = 0;
  let currentMessage = ""; // Store the latest message

  const render = () => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${spinnerFrames[frameIndex]} ${currentMessage}`);
    frameIndex = (frameIndex + 1) % spinnerFrames.length;
  };

  return {
    start: (message: string) => {
      currentMessage = message;
      if (spinnerInterval) clearInterval(spinnerInterval);
      spinnerInterval = setInterval(render, 100);
    },
    update: (message: string) => {
      currentMessage = message;
    },
    done: (message: string) => {
      if (spinnerInterval) {
        clearInterval(spinnerInterval);
        spinnerInterval = null;
      }
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      console.log(message);
    },
  };
})();
