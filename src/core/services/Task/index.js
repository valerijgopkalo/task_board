import ServiceBuilder from "@core/utilites/serviceBuilder/ServiceBuilder";
import Observer from "@core/utilites/observer/Observer";

import StatusNameEnum from "@core/utilites/enum/status/name";
import StatusTypeEnum from "@core/utilites/enum/status/type";
import PriorityNameEnum from "@core/utilites/enum/priority/name";
import PriorityTypeEnum from "@core/utilites/enum/priority/type";

import StatusEntity from "@core/entities/status/Status";
import PriorityEntity from "@core/entities/priority/Priority";

import TaskService from "./TaskService.js";

export default new ServiceBuilder(new TaskService({
    dependencies: {
        Observer,
        StatusEntity,
        PriorityEntity,
        StatusTypeEnum: StatusTypeEnum.getInstance(),
        StatusNameEnum: StatusNameEnum.getInstance(),
        PriorityNameEnum: PriorityNameEnum.getInstance(),
        PriorityTypeEnum: PriorityTypeEnum.getInstance()
    }
}));