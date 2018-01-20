import { message } from "./meesage.model";

export class user {
    id?: string;
    senderName?: string;
    username?: string;
    email?: string;
    receiverName?: string;
    passCode?: string;
    securityQuestion?: string;
    securityAnswer?: string;
    userBackgrounds: [string];
    // messages: message[];
}