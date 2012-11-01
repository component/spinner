
# Spinner

  Circular loading indicator using canvas.

  ![js loading indicator component](http://i.imgur.com/Iyl0d.png)

## Installation

```bash
$ component install juliangruber/spinner
$ npm install spinner-component
```

## Example

```js
var Spinner = require('spinner');

var spinner = new Spinner;
document.body.appendChild(spinner.el);
```

## API
  
### Spinner#font(family)

  Change the font to `family`.

### Spinner#fontSize(n)

  Change the font size to `n`.

### Spinner#size(n)

  Change the indicator diameter to `n`, defaults to 50.

### Spinner#speed(n)

  Change the speed to `n`, defaults to 50.

## License

  MIT
