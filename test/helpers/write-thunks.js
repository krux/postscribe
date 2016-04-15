export class Html {
  constructor(...value) {
    this.value = value;
    this.writeln = false;
    this.escaped = false;
  }

  asWriteln() {
    this.copy(this.value, true);
    return this;
  }

  escape() {
    return this.copy(this.value, this.writeln, true);
  }

  copy(value = this.value, writeln = this.writeln, escaped = this.escaped) {
    const that = new Html(...value);
    that.writeln = writeln;
    that.escaped = escaped;
    return that;
  }

  toArgs() {
    return !this.escaped ? `'${this.hideSlash().join("', '")}'` : _.map(this.hideSlash(), v => {
      // Wrap in a function that self removes to avoid quirky encoding in the template string.
      return `String(function(){/*&"${v}"&*/}).replace(/^[^&]+&/, '').replace(/&[^&]+$/, '')`;
    }).join(', ');
  }

  hideSlash() {
    return _.map(this.value, v => v.replace('</script>', '<\\/script>'));
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
