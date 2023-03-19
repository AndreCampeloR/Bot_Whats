import parsePhoneNumber, {isValidPhoneNumber} from "libphonenumber-js"
import { create, Whatsapp, Message, SocketState } from "venom-bot"

class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    async sendText(to: string, body: string){

        let phoneNumber = parsePhoneNumber(to, "BR")
        ?.format("E.164") 
        ?.replace("+", "") as string

        if(!isValidPhoneNumber(to, "BR")) {
            throw new Error("this number is not valid");         
        }

        phoneNumber = phoneNumber.includes("@c.us")
        ? phoneNumber 
        : `&{phoneNumber}@c.us`

        console.log("phoneNumber", phoneNumber)

        await this.client.sendText(to, body)
    }

    private initialize() {
        
        const start = (client: Whatsapp) => {
            this.client = client

            // this.sendText("5544998973198@c.us", "Olá, essa é uma mensagem automática")
        }

        create({session: 'whatsappbot', multidevice: false})
        .then((client) => start(client))
        .catch((erro) => {console.log(erro)})
    }
}

export default Sender