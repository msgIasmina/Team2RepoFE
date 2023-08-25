export class APIEndpointURLs {
   private static readonly baseUrl = 'http://localhost:8080';

  // User
  // public static readonly userUrl = APIEndpointURLs.baseUrl + '/user';
  // public static readonly allUser = APIEndpointURLs.userUrl + '/user/all';
  // public static readonly user = APIEndpointURLs.userUrl + '/id/';
  // public static readonly myStuff = APIEndpointURLs.userUrl + '/stuff';

  // Campaign

  public static readonly campaignUrl = APIEndpointURLs.baseUrl + "/management/campaigns";
  public static readonly addcampaignUrl = APIEndpointURLs.baseUrl + "/adds";

  // Auth
  public static readonly authUrl = APIEndpointURLs.baseUrl + '/auth';
  public static readonly registerUrl = APIEndpointURLs.authUrl + '/register';
  public static readonly loginUrl = APIEndpointURLs.authUrl + '/login';
}
