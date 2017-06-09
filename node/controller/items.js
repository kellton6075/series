// var Items = require('../models/items');
// var Categories = require('../models/categories');
var customHandlers = require('./custom_handlers');
var jwt = require('jsonwebtoken');
// var nodemailer=require('nodemailer');
var nodemailer = require('nodemailer');
var md5 = require('md5');
var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var token1 = '';
for (var i = 5; i > 0; --i) {
    token1 += chars[Math.round(Math.random() * (chars.length - 1))];
}
url = "'http://localhost:4000/api/app/verification/'" + token1;
var schema = require('../models/items');

// Adding an item
exports.postItem2 = function(req, res) { // Function to Post the Data in Users Collection of Database
    console.log(req.body.id + "hello")
    var key1 = req.body.id;
    schema.temp.findOne({
        key: key1
    }, function(err, response) { // Function to Find all the Users from collection
        console.log(key1);
        if (err) {
            return res.json(req, res, err);
        } else {
            var user = new schema.Users({ // Making Object of Users schema
                name: response.name,
                password: response.password,
                category: response.category,
            });
            console.log(user);

            user.save(function(err, response) { // Saving the Data into the Database
                if (err) {
                    return res.json(req, res, err);
                }

                res.json({
                    success: true,
                    body: response
                })

            });

        }

    })
}


exports.postItem = function(req, res) {
    console.log(req.body, "this is body");
    var users = new schema.temp({
        category: req.body.category,
        name: req.body.name,
        password: md5(req.body.password),


        key: token1
        // created_at:new Date(),
        // updated_at:new Date(),
    });

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'goluaggar@gmail.com',
            pass: 'golu1234'
        },
        tls: {
            rejectUnauthorised: false
        }
    });

    let HelperOptions = {
        from: '"shubham agarwal"<goluaggar@gmail.com>',
        to: req.body.name,
        subject: 'Email',
        text: 'email sent' + url
    }
    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent");
        console.log(info);
    })



    users.save(function(err, response) {
        if (err) {
            return res.json(err);
        }

        res.json({
            success: true,
            body: response
        })

    });
};
//funtion to add subscribed user
exports.postsubuser = function(req, res) {

    schema.sub.findOne({
        seriesid: req.body.seriesid
    }, function(err, response) { // Function to Find all the Users from collection
        console.log("shubham");
        if (response) {
            // console.log("agarwal");
            response.subscribeBy.push(req.body.name);
            response.save();
        } else {
            var user = new schema.sub({ // Making Object of Users schema
                subscribeBy: req.body.name,
                seriesid: req.body.seriesid
            });
            console.log(user);

            user.save(function(err, response) { // Saving the Data into the Database
                if (err) {
                    return res.json(req, res, err);
                }

                res.json({
                    success: true,
                    body: response
                })

            });

        }

    })
}






exports.check = function(req, res) {

    console.log("hi");
    var name1 = req.body.name;
    var password1 = req.body.password;

    schema.Users.findOne({
            $and: [{
                name: name1
            }, {
                password: password1
            }]
        },
        function(err, items) {
            if (err) {
                res.json(err);
            }
            console.log(items);
            var token = jwt.sign({
                name1: req.body.name
            }, 'happy')
            res.json({
                success: true,
                body: items,
                token: token
            });
        });
}

// get user's comments
exports.getUsers = function(req, res) {
    schema.Users.find({}, function(err, response) {
        if (err) {
            return res.json(err);
        }
        console.log(response, "hello");

        res.json(response);
    })
}


// edit user details, only superadmin can use this API
exports.updateUser = function(req, res) {
    var userId = req.params.userId;
    schema.Users.findOne({
        userId: userId
    }, function(err, user) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        if (req.body.userName) {
            user.userName = req.body.userName;
            user.updatedDate = new Date();
        }
        if (req.body.password) {
            user.password = req.body.password;
            user.updatedDate = new Date();
        }
        if (req.body.permission) {
            user.permission = req.body.permission;
            user.updatedDate = new Date();
        }

        user.save(function(err, response) {
            if (err) {
                return res.send(customHandlers.failureResponse(err));
            }
            res.json(customHandlers.successResponse(response));
        })
    })
}

// delete user, only superadmin can use this API
exports.deleteUser = function(req, res) {
    var userId = req.params.userId;
    schema.Users.findOne({
        userId: userId
    }, function(err, user) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        if (user) {
            schema.Users.remove({
                userId: userId
            }, function(err) {
                if (err) {
                    return res.send(customHandlers.failureResponse(err));
                }
                res.json(customHandlers.successResponse());
            })
        } else {
            res.json("User doesnt exist");
        }
    })
}

// creating a series, only admin can use this API
exports.postSeries = function(req, res) {
    var series = new schema.Series({
        seriesId: req.body.seriesId,
        seriesName: req.body.seriesName,
        description: req.body.description,
        createdBy: req.body.createdBy
    });

    series.save(function(err, response) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        res.json(customHandlers.successResponse(response));
    });
}


// get series
exports.getSeries = function(req, res) {
    schema.Series.find({}, function(err, response) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        res.json(customHandlers.successResponse(response));
    })
}

// edit series details, only admin can use this API
exports.updateSeries = function(req, res) {
    var seriesId = req.params.seriesId;
    schema.Series.findOne({
        seriesId: seriesId
    }, function(err, series) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        if (req.body.seriesName) {
            series.seriesName = req.body.seriesName;
            series.updatedDate = new Date();
        }
        if (req.body.description) {
            series.description = req.body.description;
            series.updatedDate = new Date();
        }
        if (req.body.createdBy) {
            series.createdBy = req.body.createdBy;
            series.updatedDate = new Date();
        }

        series.save(function(err, response) {
            if (err) {
                return res.send(customHandlers.failureResponse(err));
            }
            res.json(customHandlers.successResponse(response));
        })
    })
}

// delete series, only admin can use this API
exports.deleteSeries = function(req, res) {
    var seriesId = req.params.seriesId;
    schema.Series.findOne({
        seriesId: seriesId
    }, function(err, series) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        if (series) {
            schema.Series.remove({
                seriesId: seriesId
            }, function(err) {
                if (err) {
                    return res.send(customHandlers.failureResponse(err));
                }
                res.json(customHandlers.successResponse());
            })
        } else {
            res.json("User doesnt exist");
        }
    })
}

// creating a season, only admin can use this API
exports.postSeason = function(req, res) {
    var season = new schema.Seasons({
        seriesId: req.body.seriesid,
        seasonId: req.body.seasonId,
        name    : req.body.name,
        Description: req.body.Description,
        image  :req.body.image,
        StartsOn: req.body.StartsOn,
        endsOn: req.body.endsOn
    });
    console.log(req.body.seriesid)
// console.log(season);
    schema.sub.findOne({
            seriesid: req.body.seriesid
        },
        function(err, response) {
            if (err) {
                res.json(req, res, err);
                res.end();
            }

            // res.json(response);
            console.log(response);
            for (let item = 0; item < response.subscribeBy.length; item++) {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    secure: false,
                    port: 25,
                    auth: {
                        user: 'goluaggar@gmail.com',
                        pass: 'golu1234'
                    },
                    tls: {
                        rejectUnauthorised: false
                    }
                });

                let HelperOptions = {
                    from: '"shubham agarwal"<goluaggar@gmail.com>',
                    to: response.subscribeBy[item],
                    subject: 'Email',
                    text: 'email sent' + url
                }
                transporter.sendMail(HelperOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log("Message sent");
                    console.log(info);
                })

            }

            //

        })

    season.save(function(err, response) {
        if (err) {
            console.log("In error");
            console.log(err)
        }
        res.json(response);
    });
}


// get Seasons
exports.getSeasons = function(req, res) {
  console.log("hello");
    var seriesId = req.params.seriesId;
    console.log(seriesId);

    schema.Seasons.find({
        seriesId: seriesId
    }, function(err, response) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        console.log(response)
        res.json(customHandlers.successResponse(response));
    })
}

// edit season details, only admin can use this API
exports.updateSeason = function(req, res) {
    var seasonId = req.params.seasonId;
    schema.Seasons.findOne({
        seasonId: seasonId
    }, function(err, season) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        if (req.body.seasonName) {
            season.seriesName = req.body.seasonName;
            season.updatedDate = new Date();
        }
        if (req.body.description) {
            season.description = req.body.description;
            season.updatedDate = new Date();
        }
        if (req.body.startsOn) {
            season.startsOn = req.body.startsOn;
            season.updatedDate = new Date();
        }
        if (req.body.endsOn) {
            season.endOn = req.body.endsOn;
            season.updatedDate = new Date();
        }

        season.save(function(err, response) {
            if (err) {
                return res.send(customHandlers.failureResponse(err));
            }
            res.json(customHandlers.successResponse(response));
        })
    })
}

// delete season, only admin can use this API
exports.deleteSeason = function(req, res) {
    var seasonId = req.params.seasonId;
    schema.Series.findOne({
        seasonId: seasonId
    }, function(err, season) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        if (season) {
            schema.Series.remove({
                seasonId: seasonId
            }, function(err) {
                if (err) {
                    return res.send(customHandlers.failureResponse(err));
                }
                res.json(customHandlers.successResponse());
            })
        } else {
            res.json("User doesnt exist");
        }
    })
}

// creating a comic, only admin can use this API
exports.postComic = function(req, res) {
    var comic = new schema.Comics({
        seriesId: req.body.seriesId,
        seasonId: req.body.seasonId,
        comicId: req.body.comicId,
        comicName: req.body.comicName,
        image: req.body.image,
        story: req.body.story
    });

    comic.save(function(err, response) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        res.json(customHandlers.successResponse(response));
    });
}


// get Comics
exports.getComics = function(req, res) {
    var seriesId = req.params.seriesId;
    var seasonId = req.params.seasonId;
    schema.Comics.find({
        seriesId: seriesId,
        seasonId: seasonId
    }, function(err, response) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        res.json(customHandlers.successResponse(response));
    })
}

// edit comic details, only admin can use this API
exports.updateComic = function(req, res) {
    var comicId = req.params.comicId;
    schema.Comics.findOne({
        comicId: comicId
    }, function(err, comic) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        if (req.body.comicName) {
            comic.comicName = req.body.comicName;
            comic.updatedDate = new Date();
        }
        if (req.body.image) {
            comic.image = req.body.image;
            comic.updatedDate = new Date();
        }
        if (req.body.story) {
            comic.story = req.body.story;
            comic.updatedDate = new Date();
        }

        comic.save(function(err, response) {
            if (err) {
                return res.send(customHandlers.failureResponse(err));
            }
            res.json(customHandlers.successResponse(response));
        })
    })
}

// delete comic, only admin can use this API
exports.deleteComic = function(req, res) {
    var comicId = req.params.comicId;
    schema.Comics.findOne({
        comicId: comicId
    }, function(err, comic) {
        if (err) {
            return res.send(customHandlers.failureResponse(err));
        }
        if (comic) {
            schema.Comics.remove({
                comicId: comicId
            }, function(err) {
                if (err) {
                    return res.send(customHandlers.failureResponse(err));
                }
                res.json(customHandlers.successResponse());
            })
        } else {
            res.json("Comic doesnt exist");
        }
    })
}
