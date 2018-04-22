# How to

 - git clone
 - npm install
 - npm test

# Usage

```
node parser.js 16:10 < config 
```

# Few words

Very nice and challenging problem. I took me about 1h-2h during a week to think about it here and there. 2h to code it.
Plus few minutes to make sure everything is working - I hope so.

Two biggest challenges:

 - figure out how to do `io` with JS. I have't been building many CLI with JS in a past.
 - I underestimated the `*` matching complication in my initial thought process
 
I am only testing the `lineParser.js` module as this is the only module with logic. Please run `npm test` to see what's going on.

# What I would do differently

The `*` matching is ugly - lots of nested `ifs` and `parseInt` - I would definitely rethink it if I would have more time.
Maybe spend some time to look up the library for `cron` file parsing?
Split it up to more modules. Add more testing.
