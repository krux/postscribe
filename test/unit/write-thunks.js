export class Html {
  constructor(...value) {
    this.value = value;
    this.writeln = false;
  }

  asWriteln() {
    this.writeln = true;
    return this;
  }
}

export class Uri {
  constructor(value) {
    this.value = value;
  }
}

export class Js {
  constructor(value) {
    this.value = value;
  }
}
