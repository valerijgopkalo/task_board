import ServiceBuilder from "@core/utilites/serviceBuilder/ServiceBuilder";
import Observer from "@core/utilites/observer/Observer";

import ModalDialogService from "./ModalDialogService.js";

export default new ServiceBuilder(new ModalDialogService({
    dependencies: {
        Observer
    }
}));