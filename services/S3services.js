const AWS = require('aws-sdk');
require('dotenv').config();

async function uploadToS3(data, filename){

    let s3bucket = new AWS.S3({
        accessKeyId: process.env.IAM_USER_KEY,
        secretAccessKey: process.env.IAM_USER_SECRET,
    });
    console.log(s3bucket);
    var params = {
        Bucket: 'expensetrackingapp111',
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params, (err,s3response)=> {
            if(err) {
                console.log('Error Occured>>>>',err);
                reject(err);
            } else {
                resolve(s3response.Location);
            }
        })
    })
}

module.exports = {
    uploadToS3
}