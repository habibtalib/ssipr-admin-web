export default function(c) {
  c.store.dispatch('admin_auth/initAuth', c.req)
}
