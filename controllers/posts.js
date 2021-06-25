const Post = require('../models/post');

module.exports = (app) => {

    app.post('/posts/new', (req, res) => {
        // console.log(req.body);
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body)

        // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
        post.save(() => res.redirect('/'))
    });
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    })

    app.get('/', async (req, res) => {
        try {
            const posts = await Post.find({}).lean();
            return res.render('posts-index', { posts });
        } catch (err) {
            console.log(err.message);
        }
    });

    // LOOK UP THE POST
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id).lean()
            .then((post) => res.render('posts-show', { post }))
            .catch((err) => {
                console.log(err.message);
            });
    });

    // SUBREDDIT
    app.get('/n/:subreddit', async (req, res) => {
        // console.log(req.params.subreddit);
        try {
            const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
            return res.render('posts-index', { posts });
        } catch (err) {
            console.log(err.message);
        }
    });

};