export class AuthUser {
    userName: String;
    password: String;
}

export class Channel {
    constructor(
        public chnumber: number,
        public catentryId: number,
        public chname: string,
        public url: string,
        public price: number
    ) {

    }
}

export class Orders {
    constructor(
        public orderId: number,
        public userId: number,
        public channels: number,
        public totalPrice: number,
        public totalTax: number,
        public orderStatus: string,
        public creationDate: string,
        public lastUpdate: string
    ) {

    }
}