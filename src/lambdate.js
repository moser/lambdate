LambDate = function(time) {
  if(time instanceof Date) {
    this._time = time.getTime();
  } else if(typeof time === "number") {
    this._time = time;
  } else {
    this._time = new Date().getTime();
  }
};

LambDate.prototype.toMs = function() {
  return this._time;
};

LambDate.prototype.toS = function() {
  return Math.round(this._time / 1000.0);
};

LambDate.prototype.toDate = function() {
  return new Date(this._time);
};

LambDate.prototype.toObj = function() {
  date = this.toDate();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds()
  };
};

LambDate.prototype.plus = function(n, unit) {
  if(typeof n != "number") {
    throw "Not a number";
  }
  if(unit == undefined || unit === "second" || unit === "seconds") {
    return new LambDate(this._time + n * 1000);
  } else if(unit === "minute" || unit === "minutes") {
    return this.plus(n * 60);
  } else if(unit === "hour" || unit === "hours") {
    return this.plus(n * 3600);
  } else if(unit === "day" || unit === "days") {
    return this.plus(n * 24 * 3600);
  } else if(unit === "month" || unit === "months") {
    obj = this.toObj();
    date = new Date(
          obj.year,
          obj.month + n - 1,
          obj.day,
          obj.hour,
          obj.minute,
          obj.second);
    date.setMilliseconds(obj.millisecond);
    return new LambDate(date);
  } else if(unit === "year" || unit === "years") {
    obj = this.toObj();
    date = new Date(
          obj.year + n,
          obj.month - 1,
          obj.day,
          obj.hour,
          obj.minute,
          obj.second);
    date.setMilliseconds(obj.millisecond);
    return new LambDate(date);
  } else {
    throw "Unknown unit '"+ unit +"'";
  }
};

LambDate.prototype.minus = function(n, unit) {
  return this.plus(-n, unit);
};

var _delegated = [
  'toLocaleString', 'toLocaleTimeString', 'toLocalDateString',
  'toString', 'toTimeString', 'toDateString',
  'toUTCString', 'toISOString', 'toJSON', 'valueOf'
];

_delegated.forEach(function(method) {
  LambDate.prototype[method] = function() {
    return this.toDate()[method](arguments);
  };
});

module.exports = LambDate;
