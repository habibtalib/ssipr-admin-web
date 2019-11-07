export default function({ store, redirect }) {
  if (!store.getters['admin_auth/token']) {
    redirect('/')
  }
}
