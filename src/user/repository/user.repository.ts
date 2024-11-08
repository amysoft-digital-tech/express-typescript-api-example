import { User } from "../entities/user.entity";
import { UserPasscode } from "../entities/user-passcode.entity";
import { UserSalt } from "../entities/user-salt.entity";
import { CreateUserDTO } from "../dto/create-user.dto";
import { CreateUserPasscodeDTO } from "../dto/create-user-passcode.dto";
import { CreateUserSaltDTO } from "../dto/create-user-salt.dto";
import { AuthenticateUserDTO } from "../../common/dto/authenticate-user.dto";


const getUsers = (relations: boolean) => {
    return User.find();
};

const getUser = (_id: number) => {
    return User.findOneBy({id:_id});
}

const getUserByUsername = (_username: string) => {
    return User.findOneBy({username: _username});
};

const createUser = (_body: CreateUserDTO) => {
    return User.save({ ..._body });
};

const saveUserPasscode = (_body: CreateUserPasscodeDTO) => {
    return UserPasscode.save({ ..._body });
};

const saveUserSalt = (_body: CreateUserSaltDTO) => {
    return UserSalt.save({ ..._body });
};

const getUserPasscode = (_id: number) => {
    return UserPasscode.findOneBy({userId: _id});
};

const getUserSalt = (_id: number) => {
    return UserSalt.findOneBy({userId: _id});
};

export default {
    getUser,
    getUsers,
    getUserByUsername,
    createUser,
    saveUserPasscode,
    saveUserSalt,
    getUserPasscode,
    getUserSalt,
}

