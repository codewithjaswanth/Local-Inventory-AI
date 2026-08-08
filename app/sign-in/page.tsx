import { redirect } from 'next/navigation';

export default function SignInDashRedirectPage() {
  redirect('/login');
}
