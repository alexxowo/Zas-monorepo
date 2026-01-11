import { AsyncLocalStorage } from "node:async_hooks";

export interface AppContext {
  token?: string;
  userId?: string;
  langId?: string;
  role?: string;
  requestId?: string;
}

export class GlobalService {

  private static storage = new AsyncLocalStorage<AppContext>();

  static run(context: AppContext, fn: () => void) {
    this.storage.run(context, fn);
  }

  static getContext() {
    return this.storage.getStore();
  }

  static get getToken() {
    return this.storage.getStore()?.token || null;
  }

  static get getUserId() {
    return this.storage.getStore()?.userId;
  }

  static get getLangId() {
    return this.storage.getStore()?.langId;
  }

  static get getRole() {
    return this.storage.getStore()?.role;
  }

  static get getRequestId() {
    return this.storage.getStore()?.requestId;
  }

}