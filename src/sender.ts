import parsePhoneNumber, {isValidPhoneNumber} from "libphonenumber-js"
import { create, Whatsapp, Message, SocketState } from "venom-bot"


export type QRcode = {
    base64Qr: string
    attempts: number
}

class Sender {
    private client: Whatsapp
    private connected: boolean
    private qr: QRcode

    get isConnected(): boolean {
        return this.connected
    }

    get qrCode(): QRcode {
        return this.qr
    }

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
        const qr = (
            base64Qr: string, attempts: number, 
            ) => {
            this.qr = { base64Qr, attempts}
        }

        const status = (statusSession: string) => {
            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"]
            .includes(statusSession)
        }

        const start = (client: Whatsapp) => {
            this.client = client

            client.onStateChange((state) => {
                this.connected = state === SocketState.CONNECTED
            })
   
            // this.sendText("5544998973198@c.us", "Olá, essa é uma mensagem automática")
        }

        create({session: 'whatsappbot', multidevice: false})
        .then((client) => start(client))
        .catch((erro) => {console.log(erro)})
    }
}

export default Sender