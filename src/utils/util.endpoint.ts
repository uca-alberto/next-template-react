const BASE_URL = import.meta.env.APP_BASE_URL;
//"http://localhost:8047/api"

interface ApiFetch {
  api: string;
  initialDate: string;
  finalDate: string;
  search?: string;
  pageNumber?: number;
}

const APIS: any = {
  SECURITY: {
    login: `${BASE_URL}/auth/user/sign-in`,
    logout: `${BASE_URL}/auth/user/sign-out`,
    validate: `${BASE_URL}/auth/user/validate`,
    rescue_password: `${BASE_URL}/auth/user/rescue-password`,
    recover_pass: `${BASE_URL}/auth/user/recovery-password`,
    verify_account: `${BASE_URL}/auth/user/auth/verify`,
  },
  USER: {
    get: `${BASE_URL}/auth/user/by-id`,
    list: `${BASE_URL}/auth/user/list`,
    upsert: `${BASE_URL}/auth/user/upsert`,
    edit: `${BASE_URL}/auth/user/edit`,
    delete: `${BASE_URL}/auth/user`,
    status: `${BASE_URL}/auth/user/status`,
  },
  ROLES: {
    get: `${BASE_URL}/auth/role`,
    listline: `${BASE_URL}/auth/role`,
    list: `${BASE_URL}/auth/role/list`,
    delete: `${BASE_URL}/auth/role`,
    upsert: `${BASE_URL}/auth/role/upsert`,
    status: `${BASE_URL}/auth/role/status`,
  },
  MODULES: {
    list: `${BASE_URL}/auth/module/list`,
  },
  SECTION: {
    getById: `${BASE_URL}/asset/sections`,
    list: `${BASE_URL}/asset/sections`,
    edit: `${BASE_URL}/asset/sections`,
  },
  MENU: {
    list: `${BASE_URL}/asset/menu`,
    edit: `${BASE_URL}/asset/menu`,
  },
  SOCIAL_MEDIA: {
    getById: `${BASE_URL}/asset/social-media`,
    list: `${BASE_URL}/asset/social-media`,
    update: `${BASE_URL}/asset/social-media`,
    delete: `${BASE_URL}/asset/social-media`,
    create: `${BASE_URL}/asset/social-media`,
    upload_file: `${BASE_URL}/asset/upload/redes_social`,
  },

  BANK_ACCOUNTS: {
    getById: `${BASE_URL}/bank-accounts`,
    list: `${BASE_URL}/bank-accounts`,
    update: `${BASE_URL}/bank-accounts`,
    delete: `${BASE_URL}/bank-accounts`,
    create: `${BASE_URL}/bank-accounts`,
  },
  TYPE_PAYMENT: {
    getById: `${BASE_URL}/type-payment`,
    list: `${BASE_URL}/type-payment`,
    update: `${BASE_URL}/type-payment`,
  },
  TYPE_ACCOUNT: {
    list: `${BASE_URL}/type-account`,
    update: `${BASE_URL}/type-account`,
  },
  PROVIDER_PAYMENT: {
    getById: `${BASE_URL}/provider-payment`,
    list: `${BASE_URL}/provider-payment`,
    update: `${BASE_URL}/provider-payment`,
    upload_file: `${BASE_URL}/asset/upload/online_payments`,
  },

  BANNER: {
    getById: `${BASE_URL}/profile-manager/banner`,
    list: `${BASE_URL}/profile-manager/banner`,
    create: `${BASE_URL}/profile-manager/banner`,
    update: `${BASE_URL}/profile-manager/banner`,
    delete: `${BASE_URL}/profile-manager/banner`,
    action: `${BASE_URL}/profile-manager/type-action`,
    upload_file: `${BASE_URL}/asset/upload/banner`,
    section: `${BASE_URL}/asset/banner-section`,
    auto_complete_hotel: `${BASE_URL}/middleware/autocomplete`,
  },

  ASSET_HANDLER: {
    class: `${BASE_URL}/asset/class`,
    service: `${BASE_URL}/asset/service`,
  },

  USER_TRACKING: {
    list: `${BASE_URL}/auditory/register-progress-event`,
    pages: `${BASE_URL}/auditory/pages`,
    events: `${BASE_URL}/auditory/events`,
  },

  BOOKINGS: {
    list: `${BASE_URL}/sales-order/reservation`,
    getById: `${BASE_URL}/sales-order/reservation/find`,
  },

  AUDITOY_RESERVE: {
    list: `${BASE_URL}/auditory/consolidate-reserve`,
    service_top: `${BASE_URL}/auditory/consolidate-reserve/services/price`,
    service_status: `${BASE_URL}/auditory/consolidate-reserve/services/status`,
    service_count: `${BASE_URL}/auditory/consolidate-reserve/services/count`,
    reserve_top: `${BASE_URL}/auditory/consolidate-reserve/top-reserves`,
    reserve_status: `${BASE_URL}/order/status-reservation`,
  },
};

const urlReport = ({
  api,
  initialDate,
  finalDate,
  pageNumber = 1,
  search = "",
}: ApiFetch) => {
  const pageApi = `&pageNumber=${pageNumber}&pageSize=10`;
  const url = `${APIS[api]}?inicialDate="${initialDate}"&finalDate="${finalDate}"${pageApi}`;
  const urlApi = search?.trim().length ? `${url}&search=${search}` : url;
  return urlApi;
};

export { urlReport, APIS };
