const functions = require("firebase-functions");
const firebase = require('firebase-admin');
const cors = require('cors')({ origin: false });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.projetoFinalAPI = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        firebase.database().ref("listaDeImagem").on('value', function (snapshot) {
            let res = snapshotToArray(snapshot)
            console.log(res);
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
        res.send("Ok Status 200");
    });
});
