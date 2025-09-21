import { ProfileComponent } from "../../components/profile";
import { useProfile } from "../../services/profile";
import { Loading } from "../../utility/loading"

export const ProfilePage = () => {
  const { profile, loading, updateProfile } = useProfile();

  if (loading) return <Loading text="Loading profile..." />;
  if (!profile) return <p>No profile found</p>;

  return (
    <ProfileComponent
      initialData={profile}
      onUpdate={updateProfile}
    />
  );
};
