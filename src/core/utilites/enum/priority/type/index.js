import Enum from "@core/utilites/enum/Enum";
import ServiceBuilder from "@core/utilites/serviceBuilder/ServiceBuilder";

export default new ServiceBuilder(new Enum({
    fields: [
        {key: "low", value: 1},
        {key: "high", value: 2},
        {key: "highest", value: 3}
    ]
}));

