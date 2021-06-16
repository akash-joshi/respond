let counter = 0;
let firstRender = true;

let hooksArray: Array<unknown | Array<unknown>> = [];

let effectQueue: Array<() => void> = [];
let stateQueue: Array<{ counterValue: number; newState: unknown }> = [];

let globalApp: (() => string) | undefined = undefined;

const runEffects = async () => {
  await Promise.all(effectQueue.map(async (callback) => await callback()));
};

const runStateUpdates = () => {
  stateQueue.forEach((stateUpdate) => {
    hooksArray[stateUpdate.counterValue] = stateUpdate.newState;
  });

  stateQueue = [];
};

export const render = async (App?: () => string) => {
  counter = 0;

  if (!globalApp) {
    globalApp = App;
  }

  if (!globalApp) {
    return console.error("No root component was passed to Respond");
  }

  if (!document.getElementById("app")) {
    return console.error(
      "Missing initializing element with id app in main HTML"
    );
  }

  if (!firstRender) {
    runStateUpdates();
  }

  document.getElementById("app")!.innerHTML = globalApp();

  await runEffects().then(() => {
    effectQueue = [];
  });

  if (firstRender) {
    firstRender = false;
  }
};

export const useState = (initialState: unknown) => {
  const currentCounterValue = counter;

  let currentState = hooksArray?.[currentCounterValue];

  if (firstRender) {
    hooksArray[currentCounterValue] = initialState;

    currentState = initialState;
  }

  const updateState = (newState: unknown) => {
    stateQueue.push({ counterValue: currentCounterValue, newState });
    render();
  };

  counter++;
  return [currentState, updateState];
};

export const useEffect = (
  callback: () => void,
  dependencyParams?: Array<unknown>
) => {
  if (!dependencyParams) {
    return effectQueue.push(callback);
  }

  if (firstRender) {
    effectQueue.push(callback);
  } else if (dependencyParams?.length > 0) {
    if (
      (hooksArray[counter] as Array<unknown>).some((oldDependency, index) => {
        if (oldDependency !== dependencyParams[index]) {
          return true;
        }
        return false;
      })
    ) {
      effectQueue.push(callback);
    }
  }

  hooksArray[counter] = dependencyParams;
  counter++;
};
