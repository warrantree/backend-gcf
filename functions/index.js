const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello and welcome to ShopedDB!");
//  console.log('this is a log from fb functions');
// });

// exports.sanitizePost = functions.database
//     .ref('/posts/{pushId}')
//     .onWrite(event => {
//         const post = event.data.val();
//         if (post.sanitized){
//             return;
//         }
//         console.log("Sanitizing new post: " + event.params.pushId);
//         console.log(post);
//         post.sanitized = true;
//         post.title = sanitize(post.title);
//         post.body = sanitize(post.body);
//         const promise = event.data.ref.set(post);
//         // use const promise to ensure synchronous writes
//         return promise;
//     });

//     function sanitize(s){
//         var sanitizedText = s;
//         sanitizedText = sanitizedText.replace(/\bstupid\b/ig, "wonderful");
//         return sanitizedText;
//     }

//     exports.emailEmployeeReport = functions.database
//         .ref('/employees/${empId}/reports/${repId}')
//         .onWrite(event =>{
//             const empId = event.params.empId;
//             const report = event.data.val().report;
//             const root = event.data.ref.root;
//             console.log('Starting Promise #01');
//             return root.child('/employees/${empId}/manager').once('value').then(snap => {
//                 console.log('Starting Promise #02');
//                 const mgrId = snap.val();
//                 return root.child('/employees/${mgrId}/emial').once('value');
//             }).then(snap => {
//                 console.log('Starting Promise #03');
//                 const email = snap.val();
//                 return sendReportEmail(email, report);
//             }).catch(reason =>{
//                 console.log('Catching reasons for failure of any Promise #01');
//                 //Handle the error
//                 console.log(reason);
//             });
//         });

//     exports.sendThanks = functions.database
//         .ref('/thanks/${eId1}/${eId2}')
//         .onWrite(event => {
//             const eId1 = event.params.eId1;
//             const eId2 = event.params.eId2;
//             const pr1 = root.child('/employees/${eId1}').once('value');
//             const pr2 = root.child('/employees/${eId2}').once('value');
//             return Promise.all([pr1, pr2]).then(results => {
//                 const e1 = results[0].val();
//                 const e2 = results[1].val();

//                 const email1 = sendEmail(e1.email, 'Thanks for helping ${e2.name}!');
//                 const email2 = sendEmail(e2.email, 'Your genorosity knows no bounds man! Thanks for recognizing ${e1.name} for all their hard work!');
//                 return Promise.all([emai1, email2]);
//             });
//         });


admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref();

exports.createUserAccountinDB = functions.auth.user().onCreate(event => {
    const cUID = event.data.uid;
    const cMail = event.data.email;
    const cCreatedOn = event.data.metadata.createdAt;
    const cDP = event.data.photoUrl || 'https://github.com/warrantree/backend-gcf/blob/test/static/close_enough.jpg';
    
    const newUserRef = ref.child(`/users/${cUID}`);
    
    return newUserRef.set({
        cDP: cDP,
        cMail: cMail
    });
});