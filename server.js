const Vue = require('vue');
const server = require('express')();
const createRenderer = require('vue-server-renderer').createRenderer;

const renderer = createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

server.get('*', (req, res) => {

    const context = {
        title: 'hello',
        meta: '<meta content="*/*" name="test"><meta content="*/*" name="test2">'
    };

    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>The visited URL is: {{ url }}</div>`
    });

    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error');
            return;
        }
        res.end(html);
    });
});

server.listen(8080);
