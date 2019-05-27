export class AuthUser{
    userName: String;
    password: String;
}

export class Channel{
    constructor(
        public chnumber : number,
        public catentryId : number,
        public chname : string,
        public url : string, 
        public price: number
    ){

    }
}