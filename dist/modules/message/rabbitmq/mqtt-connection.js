"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToMQTT = exports.connectToMQTTBroker = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
const options = {
    protocol: 'mqtt', // Especificar el tipo explícitamente
    port: 1883,
    username: 'Angel',
    password: 'Ramirez22',
};
let client;
const connectToMQTTBroker = () => {
    client = mqtt_1.default.connect('mqtt://52.1.210.218', options);
    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        const topic = 'Mensaje';
        client.subscribe(topic, (err) => {
            if (!err) {
                console.log(`Subscribed to topic: ${topic}`);
            }
        });
    });
    client.on('error', (error) => {
        console.error('MQTT connection error:', error);
    });
    client.on('message', (topic, message) => {
        console.log(`Message received on topic ${topic}: ${message.toString()}`);
        // Aquí puedes decidir qué hacer con el mensaje recibido
    });
};
exports.connectToMQTTBroker = connectToMQTTBroker;
const sendMessageToMQTT = (remitente_id, destinatario_id, mensaje) => {
    const message = {
        remitente_id,
        destinatario_id,
        mensaje,
        fecha_envio: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    const messageString = JSON.stringify(message);
    client.publish('Mensaje', messageString, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error('Error sending message to MQTT:', error);
        }
        else {
            console.log('Message sent to MQTT');
        }
    });
};
exports.sendMessageToMQTT = sendMessageToMQTT;
