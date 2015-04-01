Tinytest.add('Ensure that a single newline is handled properly at the end of the file', function (test) {
  test.equal(csvToArray("blub,foo,bar,baz\nasdf,qwerty,zxcvb,fghjf\n", ","), [ { blub: 'asdf', foo: 'qwerty', bar: 'zxcvb', baz: 'fghjf' } ] );
});

Tinytest.add('Ensure that multiple newlines are handled properly at the end of the file', function (test) {
  test.equal(csvToArray("blub,foo,bar,baz\nasdf,qwerty,zxcvb,fghjf\n\n", ","), [ { blub: 'asdf', foo: 'qwerty', bar: 'zxcvb', baz: 'fghjf' } ] );
});

Tinytest.add('Ensure that multiple newlines are handled properly in the middle of the file', function (test) {
  test.equal(csvToArray("blub,foo,bar,baz\n\n\n\nasdf,qwerty,zxcvb,fghjf", ","), [ { blub: 'asdf', foo: 'qwerty', bar: 'zxcvb', baz: 'fghjf' } ] );
});

Tinytest.add('Ensure that blank fields are handled properly', function (test) {
  test.equal(csvToArray("blub,foo,bar,baz\n\asdf,,zxcvb,fghjf", ","), [ { blub: 'asdf', foo: '', bar: 'zxcvb', baz: 'fghjf' } ] );
});

Tinytest.add('Ensure that blank field names are handled properly', function (test) {
  test.equal(csvToArray("blub,foo,,baz\nasdf,qwerty,zxcvb,fghjf", ","), [ { blub: 'asdf', foo: 'qwerty', '': 'zxcvb', baz: 'fghjf' } ] );
});

Tinytest.add('Ensure incomplete rows are handled properly', function (test) {
  test.equal(csvToArray("blub,foo,bar,baz\nasdf,qwerty,fghjf", ","), [ { blub: 'asdf', foo: 'qwerty', bar: 'fghjf' } ] );
});