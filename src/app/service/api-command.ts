import { environment } from '../../environments/environment';

export class CommandURL{
  public static SERVICE = environment.PROCESS_SERVICE + '/api/banking/service';

  public static EMPLOYEE = environment.PROCESS_SERVICE + '/api/banking/employee';

  public static ROLE = environment.PROCESS_SERVICE + '/api/banking/role';

  public static TICKET = environment.PROCESS_SERVICE + '/api/banking/ticket';

  public static LOGIN = environment.PROCESS_SERVICE + '/api/banking/auth';

  public static SCREEN = environment.PROCESS_SERVICE + '/api/banking/screen';

  public static MENU = environment.PROCESS_SERVICE + '/api/banking/menu';
}