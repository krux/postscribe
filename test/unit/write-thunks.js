export class Html {
  constructor(value, writeln = false) {
    this.writeln = writeln;
    this.value = value;
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
