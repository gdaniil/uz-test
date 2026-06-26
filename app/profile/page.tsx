import { BottomNav } from "../components/BottomNav";
import { ProfileScreen } from "./ProfileScreen";

export default function ProfilePage() {
  return (
    <main className="stage">
      <section className="phone" aria-label="Профіль">
        <ProfileScreen />
        <BottomNav active="profile" />
      </section>
    </main>
  );
}
