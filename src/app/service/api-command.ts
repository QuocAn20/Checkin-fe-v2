import { environment } from '../../environments/environment';

export class CommandURL{
  public static SERVICE = environment.PROCESS_SERVICE + '/api/checkin/service';

  public static EMPLOYEE = environment.PROCESS_SERVICE + '/api/checkin/employee';

  public static SURVEY = environment.PROCESS_SERVICE + '/api/checkin/survey';

  public static ROOM = environment.PROCESS_SERVICE + '/api/checkin/room';

  public static UNIT = environment.PROCESS_SERVICE + '/api/checkin/unit';

  public static ROLE = environment.PROCESS_SERVICE + '/api/checkin/role';

  public static TICKET = environment.PROCESS_SERVICE + '/api/checkin/ticket';

  public static LOGIN = environment.PROCESS_SERVICE + '/api/checkin/auth';

  public static SCREEN = environment.PROCESS_SERVICE + '/api/checkin/screen';

  public static MENU = environment.PROCESS_SERVICE + '/api/checkin/menu';
}