import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/modules/auth';

const { VITE_AUTH_BUTTON_MODE = 'route_meta' } = import.meta.env;

export function useAuth() {
  const authStore = useAuthStore();

  const route = useRoute();

  const hasAuthModelPermissionMap: Record<Env.AuthButtonMode, string[]> = {
    route_meta: route?.meta.permissions ?? [],
    user_info: authStore.userInfo.permissions ?? []
  };

  function hasAuth(codes: string | string[]) {
    if (!authStore.isLogin) {
      return false;
    }

    const permissions = hasAuthModelPermissionMap[VITE_AUTH_BUTTON_MODE as Env.AuthButtonMode];

    if (typeof codes === 'string') {
      return permissions.includes(codes);
    }

    return codes.some(code => permissions.includes(code));
  }

  return {
    hasAuth
  };
}
