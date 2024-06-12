export class BatchRequest {
  apiFunction: any;
  batchSize: number;
  queue: any[];
  promises: Map<any, any>;
  constructor(apiFunction: any, batchSize = 10) {
    this.apiFunction = apiFunction;
    this.batchSize = batchSize;
    this.queue = [];
    this.promises = new Map();
  }

  add(name: any) {
    return new Promise((resolve, reject) => {
      this.queue.push(name);
      this.promises.set(name, { resolve, reject });
      if (this.queue.length >= this.batchSize) {
        this.flush();
      }
    });
  }

  async flush() {
    if (this.queue.length === 0) {
      return;
    }
    const namesToValidate = [...this.queue];
    this.queue = [];
    try {
      const result = await this.apiFunction(namesToValidate);
      for (const name of namesToValidate) {
        const current = result.validate.find((v: any) => v.id === name);
        if (current) {
          this.promises.get(name).resolve(current);
        } else {
          this.promises.get(name).reject(new Error('Invalid name'));
        }
        this.promises.delete(name);
      }
    } catch (error) {
      for (const name of namesToValidate) {
        this.promises.get(name).reject(error);
        this.promises.delete(name);
      }
    }
  }
}
