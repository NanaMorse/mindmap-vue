import * as Koa from 'koa'
import * as serve from 'koa-static'

const app = new Koa();
app.use(serve('./public'));

app.listen(3000);

console.log('application is running on port 3000');