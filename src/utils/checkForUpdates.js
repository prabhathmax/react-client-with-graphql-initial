const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const INTERVAL = 30e3;
const HARD_TIMEOUT = 60e3 * 60;

function getHash(html) {
  const m = html.match(/src="[^"]+\bmain\.([a-fA-F0-9]+)\.js"/);

  return m ? m[1] : null;
}

async function check() {
  const html = await fetch('/test').then((r) => r.text());

  return getHash(html);
}

export default async function checkForUpdates(callback) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const initial = getHash(document.documentElement.innerHTML);

  if (!initial) {
    console.error(`checkForUpdates failed to find the initial hash.`);
  }

  while (true) {
    await delay(INTERVAL);
    const hash = await check().catch(() => null);

    if (hash && hash !== initial) {
      console.log(`Initial hash: ${initial}, new hash ${hash}. Calling callback.`);
      callback();

      setTimeout(() => {
        console.log(
          `It's been ${HARD_TIMEOUT /
            60e3} minutes since we got the new hash, so updating`,
        );
        window.location.reload(true);
      }, HARD_TIMEOUT);

      return;
    }
  }
}
