const expect = require('chai').expect
const lineParser = require('./lineParser.js')

describe('lineParser', () => {
  describe('for time 3:45', () => {
    const parser = lineParser('3:45')
    it('corectly parses the line `40 2 /e/script`', () => {
      const line = '40 2 /e/script'
      const expected = '2:40 tomorrow - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `40 4 /e/script`', () => {
      const line = '40 4 /e/script'
      const expected = '4:40 today - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `45 3 /e/script`', () => {
      const line = '45 3 /e/script'
      const expected = '3:45 today - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `* * /e/script`', () => {
      const line = '* * /e/script'
      const expected = '3:45 today - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `* 3 /e/script`', () => {
      const line = '* 3 /e/script'
      const expected = '3:45 today - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `* 4 /e/script`', () => {
      const line = '* 4 /e/script'
      const expected = '4:00 today - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `* 2 /e/script`', () => {
      const line = '* 2 /e/script'
      const expected = '2:00 tomorrow - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `40 * /e/script`', () => {
      const line = '40 * /e/script'
      const expected = '4:40 today - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `46 * /e/script`', () => {
      const line = '46 * /e/script'
      const expected = '3:46 today - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `45 * /e/script`', () => {
      const line = '45 * /e/script'
      const expected = '3:45 today - /e/script'

      expect(parser(line)).to.eql(expected)
    })
  })

  describe('for time 23:45', () => {
    const parser = lineParser('23:45')

    it('corectly parses the line `40 * /e/script`', () => {
      const line = '40 * /e/script'
      const expected = '00:40 tomorrow - /e/script'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `50 * /e/script`', () => {
      const line = '50 * /e/script'
      const expected = '23:50 today - /e/script'

      expect(parser(line)).to.eql(expected)
    })
  })

  describe('for time 16:10', () => {
    const parser = lineParser('16:10')

    it('corectly parses the line `30 1 /bin/run_me_daily`', () => {
      const line = '30 1 /bin/run_me_daily'
      const expected = '1:30 tomorrow - /bin/run_me_daily'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `45 * /bin/run_me_hourly`', () => {
      const line = '45 * /bin/run_me_hourly'
      const expected = '16:45 today - /bin/run_me_hourly'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `* * /bin/run_me_every_minute`', () => {
      const line = '* * /bin/run_me_every_minute'
      const expected = '16:10 today - /bin/run_me_every_minute'

      expect(parser(line)).to.eql(expected)
    })

    it('corectly parses the line `* 19 /bin/run_me_sixty_times`', () => {
      const line = '* 19 /bin/run_me_sixty_times'
      const expected = '19:00 today - /bin/run_me_sixty_times'

      expect(parser(line)).to.eql(expected)
    })
  })
})
