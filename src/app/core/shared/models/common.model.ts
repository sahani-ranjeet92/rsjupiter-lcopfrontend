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

export class UserDetail {
    constructor(
        public mobileno: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public gender: string,
        public status: string,
        public dateOfBirth: Date
    ) {

    }
}