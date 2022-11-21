import { useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import jwtDecode from "jwt-decode";
import AOS from "aos";
import _ from "lodash";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

AOS.init({
  duration: 800,
});

const Login = () => {
  const navigate = useNavigate();
  const handleResponse = (res: google.accounts.id.CredentialResponse) => {
    var userCredentials: any = jwtDecode(res.credential);
    localStorage.setItem(
      "userData",
      JSON.stringify(
        _.pick(userCredentials, ["name", "email", "picture", "sub", "exp"])
      )
    );
    localStorage.setItem("token", res.credential);
    navigate("/storage");
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID ?? "",
      auto_select: true,
      callback: handleResponse,
    });

    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        google.accounts.id.renderButton(
          document.getElementById("signInDiv") as HTMLElement,
          {
            type: "standard",
            theme: "outline",
            size: "large",
          }
        );
      }
    });
  });
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
        <FiUploadCloud data-aos="fade-up" className="text-purple-600 mx-auto" />
        <div
          data-aos-delay="50"
          data-aos="fade-up"
          className="font-thin w-fit text-center"
        >
          Wecome to{" "}
          <strong className="font-semibold text-purple-600">Uploader</strong>
        </div>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-delay="300"
        className="h-0.5 md:h-1 w-[60%] rounded-full bg-purple-600 mt-5 mb-10"
      ></div>
      <div data-aos="zoom-in" data-aos-delay="500">
        <div
          id="signInDiv"
          className="w-fit border rounded-md hover:border-purple-600 hover:shadow-md transition-all ease-in-out duration-300"
        ></div>
      </div>
    </div>
  );
};

export default Login;
