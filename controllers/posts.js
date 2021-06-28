const Post = require('../models/post');

module.exports = (app) => {
    // CREATE
    app.post('/posts/new', (req, res) => {
        if (req.user) {
            const post = new Post(req.body);

            post.save(() => res.redirect('/'));
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    })

    app.get('/', async (req, res) => {
        try {
            const posts = await Post.find({}).lean();
            const currentUser = await req.user;

            return res.render('posts-index', { posts, currentUser });
        } catch (err) {
            console.log(err.message);
        }
    });

    // LOOK UP THE POST
    app.get('/posts/:id', async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).lean().populate('comments')
            const currentUser = await req.user;

            return res.render('posts-show', { post, currentUser })
        } catch (err) {
                console.log(err.message);
            };
    });

    // SUBREDDIT
    app.get('/n/:subreddit', async (req, res) => {
        // console.log(req.params.subreddit);
        try {
            const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
            const currentUser = await req.user;

            return res.render('posts-index', { posts, currentUser });
        } catch (err) {
            console.log(err.message);
        }
    });

};