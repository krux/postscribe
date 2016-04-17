const $ = require('jquery');

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
    // Splat calls Function.bind, which won't work in old IE.
    let that = new Html();
    that.value = value;
    that.writeln = writeln;
    that.escaped = escaped;
    return that;
  }

  toArgs() {
    return !this.escaped ? `'${this.escapeSlashes().join("', '")}'` : $.map(this.escapeSlashes(), v => {
      // Wrap in a function that self removes to avoid quirky encoding in the template string.
      return `String(function(){/*&${v}&*/}).replace(/^[^&]+&/, '').replace(/&[^&]+$/, '')`;
    }).join(', ');
  }

  escapeSlashes() {
    return $.map(this.value, v => v.replace(new RegExp('</(script)>', 'i'), '<\\/$1>').replace('\n', '\\n'));
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
