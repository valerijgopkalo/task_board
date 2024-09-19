import Enum from "@core/utilites/enum/Enum";
import ServiceBuilder from "@core/utilites/serviceBuilder/ServiceBuilder";

export default new ServiceBuilder(new Enum({
    fields: [
        {key: "todo", value: "Todo"},
        {key: "inProgress", value: "InProgress"},
        {key: "done", value: "Done"}
    ]
}));

