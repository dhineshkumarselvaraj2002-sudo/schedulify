export const AUTH_ROUTES = {
  SIGN_IN: "/dashboard",
  SIGN_UP: "/pricing",
} as const;

export const PROTECTED_ROUTES = {
  EVENT_TYPES: "/dashboard/meeting-types",
  AVAILABILITY: "/dashboard/availability",
  INTEGRATIONS: "/dashboard/integrations",
  MEETINGS: "/dashboard/meetings",
  SCHEDULED_EVENTS: "/dashboard/scheduled-events",
  SCHEDULING: "/dashboard/scheduling",
} as const;
