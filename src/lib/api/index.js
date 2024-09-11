import { Hono } from 'hono'
import students from './students';
import teachers from './teachers';
import tests from './tests';
const app = new Hono()

app.route("/students", students);
app.route("/teachers", teachers);
app.route("/tests", tests);
app.get('/', (c) => c.text('Hono!'))

const api = new Hono().route('/api', app);

export default api