const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
    // CREATE
    app.post('/posts/new', (req, res) => {
        if (req.user) {
            const userId = req.user._id;
            const post = new Post(req.body);
            post.author = userId;

            post
                .save()
                .then(() => User.findById(userId))
                .then((user) => {
                    user.posts.unshift(post);
                    user.save();
                    // REDIRECT TO THE NEW POST
                    return res.redirect(`/posts/${post._id}`);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    app.get('/posts/new', (req, res) => {
        const currentUser = req.user;
        res.render('posts-new', { currentUser });
    })

    app.get('/', (req, res) => {
        const { user } = req;
        const currentUser = req.user;
        console.log(req.cookies);
        Post.find({}).lean().populate('author')
            .then((posts) => res.render('posts-index', { posts, currentUser, user }))
            .catch((err) => {
                console.log(err.message);
            });
    });

    // LOOK UP THE POST
    app.get('/posts/:id', async (req, res) => {
        try {
            // double call "populate" in order to get both fields
            const post = await Post.findById(req.params.id).lean().populate('comments').populate('author')
            const currentUser = await req.user;

            return res.render('posts-show', { post, currentUser })
        } catch (err) {
            console.log(err.message);
        };
    });

    // SUBREDDIT
    app.get('/n/:subreddit', (req, res) => {
        // console.log(req.params.subreddit);
        const currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).lean().populate('author')
        .then(posts => {
            res.render('posts-index', { posts, currentUser });
        }).catch(err => {
            console.log(err.message);
        })

    });

};