try { require('./stuff.cjs') }
catch { console.warn("No stuff.cjs found in root. It's ok if you have all appropriate system variables set. Otherwise you supposed to create a stuff.сjs and fill it by the stuff_template.cjs example you have in the root.") }

const { server, c } = require('node-web-server-with-stuff')
const {hash, verify} = require('./hashVerify.cjs')
const {connect, ObjectId} = require('./useMongo.cjs')
const db = connect(),  users = db.then(db => db.collection('users'))

const given = {hash, verify, db, users, ObjectId}

server.run({given, secure: true})


// db.then(db => global.db = db)
