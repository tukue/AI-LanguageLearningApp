const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { userId, lessonId, score, completedAt } = JSON.parse(event.body);
  
  try {
    const params = {
      TableName: process.env.PROGRESS_TABLE,
      Item: {
        userId,
        lessonId,
        score,
        completedAt,
        updatedAt: new Date().toISOString()
      }
    };
    
    await dynamodb.put(params).promise();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Progress updated successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};