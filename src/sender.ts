import { create, Whatsapp, Message, SocketState } from "venom-bot"

class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    async sendText(to: string, body: string){
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