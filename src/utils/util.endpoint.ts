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
  BENEFIT: {
    //list: `${BASE_URL}/benefit`,
    create: `http://localhost:7000/benefit`,
    update: `http://localhost:7000/benefit`,
    //delete: `${BASE_URL}/benefit`,
    //getById: `${BASE_URL}/benefit`,
    //status: `${BASE_URL}/benefit/status`,
    list: `http://localhost:7000/benefit`,
    getById: `http://localhost:7000/benefit`,
  },
  CUSTOMER: {
    item: `http://localhost:7000/customer`,
  },
  CATEGORY: {
    list: `http://localhost:7000/category`,
    listFilter: `http://localhost:7000/category/paginated`,
    getById: `http://localhost:7000/category`,
    update: `http://localhost:7000/category`,
    create: `http://localhost:7000/category`,
    status: `http://localhost:7000/category/status`,
  },
  UPLOAD: {
    upload_file: `http://localhost:7000/upload`,
  },
  BENEFIT_REQUEST: {
    list: `http://localhost:7000/benefit-request`,
    getById: `http://localhost:7000/benefit-request`,
    update: `http://localhost:7000/benefit-request`,
  },
  BENEFIT_REQUEST_OBSERVATION: {
    create: `http://localhost:7000/observation`,
    getById: `http://localhost:7000/observation/filter`,
  },
  REFERRAL: {
    list: `http://localhost:7000/referral`,
    item: `http://localhost:7000/referral/find`,
  },
  REFERRAL_FORM: {
    item: `http://localhost:7000/referral-form`,
    status: `http://localhost:7000/referral-form/status`,
  },
  REFERRAL_OBSERVATION: {
    item: `http://localhost:7000/referral-observation`,
  },
  CATALOG: {
    item: `http://localhost:7000/catalog`,
    list: `http://localhost:7000/catalog`,
    getById: `http://localhost:7000/catalog`,
    create: `http://localhost:7000/catalog`,
    update: `http://localhost:7000/catalog`,
    status: `http://localhost:7000/catalog/status`,
    children: `http://localhost:7000/catalog/children`,
  },
  PROGRAMS_RULES: {
    update: `http://localhost:7000/program-rule`,
    getById: `http://localhost:7000/program-rule`,
    list: `http://localhost:7000/program-rule`,
    getByType: `http://localhost:7000/program-rule/by-program-type-code`,
    status: `http://localhost:7000/program-rule/status`,
  },
  PROGRAMS_RULES_CATEGORY: {
    update: `http://localhost:7000/program-rule`,
    getByIdProgramRule: `http://localhost:7000/program-rule-category/by-program-rule`,
  },
  POINS_PROGRAMS_RULES: {
    save: `http://localhost:7000/point-program-category`,
    getByIdProgramRule: `http://localhost:7000/point-program-category/by-program-rule`,
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
