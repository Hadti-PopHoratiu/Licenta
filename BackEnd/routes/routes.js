var indexRouter = require('./index');
var usersRouter = require('./users');
var booksRouter = require('./books');
var genresRouter = require('./genres');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);