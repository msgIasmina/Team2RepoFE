import {Notif} from "./notification";

export class NotificationPagination{
  constructor(
    public notifications:Notif[],
    public maxPages:number
  ) {}
}
