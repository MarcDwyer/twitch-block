function toAbsoluteUrl(url: string): string {
  try {
    const Url = new URL(url, location.href);
    return Url.href;
  } catch {
    return url;
  }
}

window.Worker = class Worker extends window.Worker {
  constructor(scriptURL: string | URL, options?: WorkerOptions) {
    const fullUrl = toAbsoluteUrl(scriptURL.toString());
    const isTwitchWorker = fullUrl.includes(".twitch.tv");
    if (isTwitchWorker) {
      console.log({ fullUrl, isTwitchWorker });
    } else {
      console.log({ fullUrl });
    }
    super(scriptURL, options);
  }
};
console.log("worker ran");
