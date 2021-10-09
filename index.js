const functions = require("firebase-functions");
const firebase = require('firebase-admin');
const cors = require('cors')({ origin: true });
const app = require("express")();
firebase.initializeApp();

//const db = firebase.firestore().collection("todos");

app.get("/atari", function (request, response) {
    firebase.database().ref("listaDeImagem").on('value', function (snapshot) {
        let res = snapshotToArray(snapshot)
        response.json(res);
    })

    function snapshotToArray(snapshot) {
        let retunrArr = []

        snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key

            retunrArr.push(item)
        })

        let numberRandom = Math.floor(Math.random() * 10 + 1)

        return retunrArr[numberRandom]
    }
})


// app.post("/atari", function (request, response) {
//     db.add({ description: request.body.description })
//         .then(function () {
//             response.json({ general: "Works" });
//         })
// })

exports.API = functions.https.onRequest(app)





// firebase.database().ref("listaDeImagem").on('value', function (snapshot) {
//     let res = snapshotToArray(snapshot)
//     console.log(res);
// })

// function snapshotToArray(snapshot) {
//     let retunrArr = []

//     snapshot.forEach(function (childSnapshot) {
//         let item = childSnapshot.val();
//         item.key = childSnapshot.key

//         retunrArr.push(item)
//     })

//     let numberRandom = Math.floor(Math.random() * 10 + 1)

//     return retunrArr[numberRandom]
// }