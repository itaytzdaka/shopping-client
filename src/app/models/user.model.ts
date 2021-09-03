export class UserModel {
    public constructor(
        public _id?: string,
        public email?: string,
        public password?: string,
        public firstName?: string,
        public lastName?: string,
        public identityNumber?: string,
        public cityId?: string,
        public street?: string,
        public isAdmin?: number
    ){}

}
