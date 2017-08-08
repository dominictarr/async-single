# async-single

exploration of async programming style,
by solving the same problem the same way several times.

The problem, is to take an async function,
and wrap it to that it is only called once at a time.

``` js
var async = Single(function (value, cb) {
  ThisMayTakeSomeTime(function () {
    //...
    cb()
  })
})

async.onDrain = function () {
  //called when there is no longer something waiting to write
}

async.write(value)
```

if you call many times quickly, it may write the first time,
but then wait until that succeeds before writing the latest value.
If you have three quick writes
`async.write(1);async.write(2);async.write(3);`
then the first write is fired, then if the async operation
is still in flight before the others are received, the value
of the last write will be performed.

(in practice, we would probably want to delay the first
write so that quick writes get bundled! but we are keeping
this simple as an exercise!)

## License

MIT




