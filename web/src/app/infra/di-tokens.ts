import {AppConfig} from "../../environments/app-config";
import {InjectionToken} from "@angular/core";

export const APP_CONFIG_TOKEN = new InjectionToken<AppConfig>("appConfig");
