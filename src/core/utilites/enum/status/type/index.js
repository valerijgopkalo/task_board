import Enum from "@core/utilites/enum/Enum";
import ServiceBuilder from "@core/utilites/serviceBuilder/ServiceBuilder";

export default new ServiceBuilder(new Enum({
    fields: [
        {key: "todo", value: 1},
        {key: "inProgress", value: 2},
        {key: "done", value: 3}
    ]
}));

