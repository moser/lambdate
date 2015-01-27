describe("LambDate", function() {
  var LambDate = require('../src/lambdate.js');

  beforeEach(function() {
    date = new Date();
    subject = new LambDate();
  });

  it("represents now", function() {
    expect(subject.toMs() / 100).toBeCloseTo(new Date().getTime() / 100, 1);
  });

  describe("with a known value", function() {
    it("returns a Date()", function() {
      expect(subject.toDate()).toEqual(date);
    });
  });

  describe("#plus", function() {
    it("increments", function() {
      result = subject.plus(1);
      expect(result.toMs()).toBeGreaterThan(subject.toMs());
    });

    it("returns a new object", function() {
      expect(subject.plus(1)).not.toBe(subject);
    });

    it("defaults to seconds", function() {
      result = subject.plus(1);
      expect(result.toMs()).toEqual(subject.toMs() + 1000);
    });

    it("takes seconds", function() {
      result = subject.plus(1, "second");
      expect(result.toMs()).toEqual(subject.toMs() + 1000);

      result = subject.plus(13, "seconds");
      expect(result.toMs()).toEqual(subject.toMs() + 13 * 1000);
    });

    it("takes minutes", function() {
      result = subject.plus(1, "minute");
      expect(result.toMs()).toEqual(subject.toMs() + 60 * 1000);

      result = subject.plus(13, "minutes");
      expect(result.toMs()).toEqual(subject.toMs() + 13 * 60 * 1000);
    });

    it("takes hours", function() {
      result = subject.plus(1, "hour");
      expect(result.toMs()).toEqual(subject.toMs() + 3600 * 1000);

      result = subject.plus(13, "hours");
      expect(result.toMs()).toEqual(subject.toMs() + 13 * 3600 * 1000);
    });

    it("takes days", function() {
      result = subject.plus(1, "day");
      expect(result.toMs()).toEqual(subject.toMs() + 24 * 3600 * 1000);

      result = subject.plus(13, "days");
      expect(result.toMs()).toEqual(subject.toMs() + 13 * 24 * 3600 * 1000);
    });

    it("throws an error for unknown units", function() {
      expect(function() {
        subject.plus(42, "lightyear")
      }).toThrow("Unknown unit 'lightyear'");
    });
  });

  describe("#minus", function() {
    it("decrements", function() {
      result = subject.minus(1);
      expect(result.toMs()).toBeLessThan(subject.toMs());
    });

    it("returns a new object", function() {
      expect(subject.plus(1)).not.toBe(subject);
    });

    it("defaults to seconds", function() {
      result = subject.minus(1);
      expect(result.toMs()).toEqual(subject.toMs() - 1000);
    });
  });

  describe("with months", function() {
    beforeEach(function() {
      date = new Date(2014, 6, 13, 9, 23, 44);
      subject = new LambDate(date);
    });

    describe("#plus", function() {
      it("adds exactly one month", function() {
        result = subject.plus(1, "month").toDate().toString();
        expect(result).toEqual("Wed Aug 13 2014 09:23:44 GMT+0200 (CEST)");
      });
      
      it("handles year changes", function() {
        result = subject.minus(7, "months").toDate().toString();
        expect(result).toEqual("Fri Dec 13 2013 09:23:44 GMT+0100 (CET)");
      });
    });
  });

  describe("with years", function() {
    beforeEach(function() {
      date = new Date(2014, 6, 13, 9, 23, 44);
      subject = new LambDate(date);
    });

    describe("#plus", function() {
      it("adds exactly one year", function() {
        result = subject.plus(1, "year").toDate().toString();
        expect(result).toEqual("Mon Jul 13 2015 09:23:44 GMT+0200 (CEST)");
      });
    });
  });

  describe("conversion", function() {
    beforeEach(function() {
      date = new Date(2014, 6, 13, 9, 23, 44);
      subject = new LambDate(date);
    });

    it("returns seconds", function() {
      expect(subject.toS()).toBe(1405236224);
    });

    it("returns milliseconds", function() {
      expect(subject.toMs()).toBe(1405236224000);
    });

    it("returns an object", function() {
      result = subject.toObj();
      expect(result.year).toBe(2014);
      expect(result.month).toBe(7);
      expect(result.day).toBe(13);
      expect(result.hour).toBe(9);
      expect(result.minute).toBe(23);
      expect(result.second).toBe(44);
      expect(result.millisecond).toBe(0);
    });

    it("#toString delegates to Date#toString", function() {
      expect(subject.toString("MMM")).toEqual("Jul");
    });
  });
});
