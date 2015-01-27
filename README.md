# Lambdate
Immutable dates in JS

## Usage
Create a new instance

    var date = new Date(2014, 6, 13, 9, 23, 44);
    var ldate = new LambDate(date);

    var now = new LambDate();

    var one_s_after_unix_epoch = new LamdDate(1000);

Calculations

    var now = new LambDate();
    // the following operations leave `now` untouched.
    var in_an_hour = now.plus(1, "hour");
    var two_hours_ago = now.minus(2, "hours");

    var in_a_year = now.plus(1, "year"); // the same day next year

Conversion

    var now = new LamdDate();
    var js_now = now.toDate(); //JS Date
    var date_obj = now.toObj();
    // {year: 2015, month: 1, day: 27, hour: 21, minute: 10, second: 44, millisecond: 0}

## Run tests
Install deps

    npm install -g jasmine

Run tests

    jasmine
