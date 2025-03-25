declare interface User {
  cognitoInfo: AuthUser;
  userInfo: Tenant | Manager;
  userRole: JsonObject | JsonPrimitive | JsonArray;
}

declare type UserType = 'manager' | 'tenant';
