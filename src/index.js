/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
const { StringSession } = require('telegram/sessions');
const { TelegramClient } = require('telegram');
const readline = require('node:readline');

const apiId = 0;
const apiHash = "";
const stringSession = new StringSession("")
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
  });

async function getStarted() {
	console.log("Loading interactive example...");
	const client = new TelegramClient(stringSession, apiId, apiHash, {
	  connectionRetries: 1,
	});
	await client.start({
		phoneNumber: async () => await ask('Please enter your number: '),
		password: async () => await ask('Please enter your password: '),
		phoneCode: async () => await ask('Please enter the code you received: '),
		onError: (err) => console.log("err",err),
	  });
	console.log("You should now be connected.");
	await client.sendMessage("me", { message: "Hello!" });
}

export default {
	async fetch(request, env, ctx) {
		await getStarted()
	},
};
