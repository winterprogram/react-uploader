import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../types";
import { handleLogout } from "../../utils";
import { Logo } from "../items/Logo";
import { ProfilePic } from "../items/ProfilePic";

interface Props {
  children: ReactNode;
}

const StorageLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [userData] = useState<UserData>(
    JSON.parse(localStorage.getItem("userData") as string)
  );

  useEffect(() => {
    if (!userData || (!localStorage.getItem("token") as boolean)) navigate("/");
    if (userData?.exp > Date.now()) handleLogout();
  }, [userData, navigate]);

  return (
    <div className="min-h-screen">
      <div className="flex px-5 py-4">
        <div className="w-full flex justify-center">
          <Logo />
        </div>
        <ProfilePic userData={userData} />
      </div>
      <div className="divide-y">{children}</div>
    </div>
  );
};

export default StorageLayout;
