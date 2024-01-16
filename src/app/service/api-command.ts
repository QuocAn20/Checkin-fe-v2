import { environment } from '../../environments/environment';

export class CommandURL{
  public static SERVICE = environment.PROCESS_SERVICE + '/api/checkin/service';

  public static EMPLOYEE = environment.PROCESS_SERVICE + '/api/checkin/employee';

  public static SURVEY = environment.PROCESS_SERVICE + '/api/checkin/survey';

  public static ROOM = environment.PROCESS_SERVICE + '/api/checkin/room';

  public static HOLIDAY = environment.PROCESS_SERVICE + '/api/checkin/holiday';

  public static UNIT = environment.PROCESS_SERVICE + '/api/checkin/unit';

  public static EVENT = environment.PROCESS_SERVICE + '/api/checkin/event';

  public static NOTIFICATION = environment.PROCESS_SERVICE + '/api/checkin/notification';
  
  public static WAITINGSCREEN = environment.PROCESS_SERVICE + '/api/checkin/wscreen';

  public static LCONFIG = environment.PROCESS_SERVICE + '/api/checkin/lconfig';

  public static INOUT = environment.PROCESS_SERVICE + '/api/checkin/in-out';

  public static ROLE = environment.PROCESS_SERVICE + '/api/checkin/role';

  public static PASSCONFIG = environment.PROCESS_SERVICE + '/api/checkin/pass-config';

  public static LOGIN = environment.PROCESS_SERVICE + '/api/checkin/auth';

  public static SCREEN = environment.PROCESS_SERVICE + '/api/checkin/screen';

  public static MENU = environment.PROCESS_SERVICE + '/api/checkin/menu';

  public static USER = environment.PROCESS_SERVICE + '/api/checkin/user';
}