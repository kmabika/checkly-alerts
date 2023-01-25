import { App, AwsLambdaReceiver, subtype, BotMessageEvent, MessageAttachment } from '@slack/bolt';
import { AwsCallback, AwsEvent } from '@slack/bolt/dist/receivers/AwsLambdaReceiver';

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env['SLACK_SIGNING_SECRET'] as string,
});

const app = new App({
  token: process.env['SLACK_BOT_TOKEN'] as string,
  receiver: awsLambdaReceiver,
  /*
  processBeforeResponse: true
  Required to prevent the request from being terminated early before responding to the HTTP request that triggered it.
    */
  processBeforeResponse: true,
});

/*Listen to incoming messages of bot_message subtype
see https://api.slack.com/events/message/bot_message
*/
app.message(subtype('bot_message'), async ({ message, client, logger }) => {
  const botMessage = message as BotMessageEvent;
  try {
    /*
       Retrieve the channelID from the message text, the channelId will be the last 11 characters of the message text.
       and forward the message to the message to the relevant channel.
      */
    const channelID = botMessage.text.slice(-11);
    await client.chat.postMessage({
      channel: channelID,
      text: botMessage.text,
      attachments: botMessage.attachments as MessageAttachment[],
    });
  } catch (error) {
    logger.error(error);
  }
});

//Handle the Lambda function event
module.exports.main = async (event: AwsEvent, context: any, callback: AwsCallback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};
