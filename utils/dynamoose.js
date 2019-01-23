import dynamoose from 'dynamoose';

if (process.env.NODE_ENV === 'production') {
  dynamoose.AWS.config.update({
    accessKeyId: 'YYYYYYYYYYYYYYYYYYYY',
    secretAccessKey: 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
    region: 'us-east-1'
  });
} else {
  dynamoose.AWS.config.update({
    region: 'localhost'
  });
  dynamoose.local('http://localhost:8000');
}

export default dynamoose;