import Enum from "@core/utilites/enum/Enum";
import ServiceBuilder from "@core/utilites/serviceBuilder/ServiceBuilder";

export default new ServiceBuilder(new Enum({
    fields: [
        {key: "low", value: "Low"},
        {key: "high", value: "High"},
        {key: "highest", value: "Highest"}
    ]
}));

