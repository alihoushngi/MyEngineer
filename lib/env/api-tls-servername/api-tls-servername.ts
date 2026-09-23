import {
  Agent,
  Dispatcher,
  getGlobalDispatcher,
  setGlobalDispatcher,
} from "undici";

class OriginDispatcher extends Dispatcher {
  constructor(
    private readonly apiOrigin: string,
    private readonly apiDispatcher: Dispatcher,
    private readonly defaultDispatcher: Dispatcher,
  ) {
    super();
  }

  override dispatch(
    options: Dispatcher.DispatchOptions,
    handler: Dispatcher.DispatchHandler,
  ): boolean {
    const origin = options.origin ? new URL(options.origin).origin : "";
    const dispatcher =
      origin === this.apiOrigin ? this.apiDispatcher : this.defaultDispatcher;

    return dispatcher.dispatch(options, handler);
  }

  override close(): Promise<void>;
  override close(callback: () => void): void;
  override close(callback?: () => void): Promise<void> | void {
    const pending = this.apiDispatcher.close();

    if (callback) {
      void pending.then(callback);
      return;
    }

    return pending;
  }

  override destroy(): Promise<void>;
  override destroy(error: Error | null): Promise<void>;
  override destroy(callback: () => void): void;
  override destroy(error: Error | null, callback: () => void): void;
  override destroy(
    errorOrCallback?: Error | null | (() => void),
    callback?: () => void,
  ): Promise<void> | void {
    const error =
      typeof errorOrCallback === "function" ? undefined : errorOrCallback;
    const onComplete =
      typeof errorOrCallback === "function" ? errorOrCallback : callback;
    const pending =
      error === undefined
        ? this.apiDispatcher.destroy()
        : this.apiDispatcher.destroy(error);

    if (onComplete) {
      void pending.then(onComplete);
      return;
    }

    return pending;
  }
}

export function configureApiTlsServername(
  apiBaseUrl: string | undefined,
  tlsServername: string | undefined,
): void {
  const baseUrl = apiBaseUrl?.trim();
  const servername = tlsServername?.trim();

  if (!baseUrl || !servername) {
    return;
  }

  const apiOrigin = new URL(baseUrl).origin;
  const defaultDispatcher = getGlobalDispatcher();
  const apiDispatcher = new Agent({ connect: { servername } });

  setGlobalDispatcher(
    new OriginDispatcher(apiOrigin, apiDispatcher, defaultDispatcher),
  );
}
