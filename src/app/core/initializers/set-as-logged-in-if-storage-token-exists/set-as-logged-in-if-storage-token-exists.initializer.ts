import { APP_INITIALIZER, FactoryProvider, inject } from "@angular/core";
import { LoginFacadeService } from "src/app/shared/services/login-facade/login-facade.service";

export const setAsLoggedInIfStorageTokenExistsInitializerProvider: FactoryProvider = {
    provide: APP_INITIALIZER,
    useFactory: setAsLoggedInIfStorageTokenExistsInitializer,
    multi: true
}

export function setAsLoggedInIfStorageTokenExistsInitializer() {

    const loginFacadeService = inject(LoginFacadeService);

    return () => {
        loginFacadeService.setAsLoggedInIfStorageTokenExists();
    }    
}
