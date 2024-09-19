import ServiceBuilder from "@core/utilites/serviceBuilder/ServiceBuilder";
import Observer from "@core/utilites/observer/Observer";

import UserEntity from "@core/entities/user/User";

import UserService from "./UserService.js";
import Repository from "./Repository.js";

export default new ServiceBuilder(new UserService({
    dependencies: {
        Repository: new Repository(),
        Observer,
        UserEntity
    }
}));
