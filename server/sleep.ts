export class Sleep {
  static msleep(miliseconds) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, miliseconds);
  }

  static sleep(seconds) {
    this.msleep(seconds * 1000);
  }
}
